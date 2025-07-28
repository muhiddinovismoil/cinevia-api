import { UserService } from '@modules';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';
import { RoleTypes, User } from '@prisma/client';
import { AppMailService, RedisCacheService } from '@services';
import { ServiceExceptions, hashPass, verifyPass } from '@utils';

import { SignInDto, SignUpUserDto, VerifyOtpDto } from './dto/request';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cache: RedisCacheService,
    private readonly mailer: AppMailService,
  ) {}
  async create(payload: SignUpUserDto) {
    try {
      const user = await this.userService.findOneByCredentials(payload.email);

      if (user)
        throw new ConflictException('User with this email already exists');
      const hashedPass = await hashPass(payload.password);
      const userKey = `user:${payload.email}`;
      const userData = {
        fullname: payload.fullname,
        password: hashedPass,
        email: payload.email,
        role: RoleTypes.USER,
      };
      await this.cache.set(userKey, JSON.stringify(userData));
      const { keyHash, otp } = await this.cache.sendOtp();
      await this.mailer.sendOtp(payload.email, payload.fullname, otp);
      return { statusCode: HttpStatus.OK, data: { keyHash: keyHash } };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'create');
    }
  }

  async signin(payload: SignInDto) {
    try {
      const user = await this.userService.findOneByCredentials(payload.email);

      if (!user) throw new ForbiddenException();

      const verify = await verifyPass(user.password, payload.password);

      if (!verify) throw new BadRequestException();

      const { accessToken, refreshToken } = await this.getTokens(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'signin');
    }
  }

  async signinAsAdmin(payload: SignInDto) {
    try {
      const user = await this.userService.findOneByCredentials(
        payload.email,
        RoleTypes.ADMIN,
      );
      if (!user) {
        throw new ForbiddenException('You do not have access to login');
      }

      const verify = await verifyPass(user.password, payload.password);

      if (!verify) throw new BadRequestException();

      const { accessToken, refreshToken } = await this.getTokens(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'signinAsAdmin');
    }
  }

  async verify({ email, hashCode, otp }: VerifyOtpDto) {
    try {
      const userKey = `user:${email}`;
      const userData = await this.cache.get(userKey);
      const data = await this.prisma.user.findFirst({
        where: { email },
      });
      if (!data) {
        if (userData) {
          const isVerify = await this.cache.verifyOtp(hashCode, otp);
          if (!isVerify) throw new BadRequestException('Your code was wrong');
          const { fullname, password, email, role }: User =
            JSON.parse(userData);
          const newUser = await this.prisma.user.create({
            data: {
              fullname,
              password,
              email,
            },
          });
          await this.cache.del(userKey);
          return await this.getTokens(newUser);
        }
      } else {
        const isVerify = await this.cache.verifyOtp(hashCode, otp);
        if (!isVerify) throw new BadRequestException('Your code was wrong');
        return await this.getTokens(data);
      }
      await this.cache.del(hashCode);
      await this.cache.del(userKey);
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'verify');
    }
  }

  async getTokens(user: User) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            id: user.id,
            role: user.role,
          },
          {
            secret: this.config.get<string>('jwt.access'),
            expiresIn: this.config.get<string>('jwt.access_expires'),
          },
        ),
        this.jwtService.signAsync(
          {
            id: user.id,
            role: user.role,
          },
          {
            secret: this.config.get<string>('jwt.refresh'),
            expiresIn: this.config.get<string>('jwt.refresh_expires'),
          },
        ),
      ]);

      return {
        accessToken,
        refreshToken,
        role: user.role,
      };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'getTokens');
    }
  }
}
