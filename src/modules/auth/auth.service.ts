import { UserService } from '@modules';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';
import { RoleTypes, User } from '@prisma/client';
import { AppMailService, RedisCacheService } from '@services';
import { ServiceExceptions, hashPass, verifyPass } from '@utils';

import {
  ChangePasswordDto,
  ForgetPasswordDto,
  ResendOtpDto,
  ResetPasswordDto,
  SignInDto,
  SignUpUserDto,
  VerifyOtpDto,
} from './dto/request';

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

  async forgetPassword({ email, newPassword }: ForgetPasswordDto) {
    try {
      const user = await this.userService.findOneByCredentials(email);
      if (!user) throw new NotFoundException('User not found');
      await this.cache.set(email, newPassword);
      const { keyHash, otp } = await this.cache.sendOtp();
      await this.mailer.sendOtp(email, user.fullname, otp);
      return { data: keyHash };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'forgetPassword');
    }
  }

  async resetPassword({ email, hashCode, code }: ResetPasswordDto) {
    try {
      const user = await this.userService.findOneByCredentials(email);
      if (!user) throw new NotFoundException('Invalid or expired token');
      const isVerify = await this.cache.verifyOtp(hashCode, code);
      if (!isVerify) {
        throw new BadRequestException('code xato kiritildi');
      }
      const newPassword = await this.cache.get(email);
      const hashedPassword = await hashPass(newPassword);

      await this.cache.del(email);
      await this.cache.del(hashCode);
      await this.userService.updatePassword(user.id, hashedPassword);
      return { message: 'Password reset successfull' };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'resetPassword');
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

  async resendOtp({ email, hashCode }: ResendOtpDto) {
    try {
      const user = await this.userService.findOneByCredentials(email);
      if (!user) throw new NotFoundException('User not found');
      await this.cache.del(hashCode);
      const { keyHash, otp } = await this.cache.sendOtp();
      await this.mailer.sendOtp(email, user.fullname, otp);
      return { data: keyHash };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'resendOtp');
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

  async changePassword(
    id: string,
    { oldPassword, password }: ChangePasswordDto,
  ) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      const comparePassword = await verifyPass(user.password, oldPassword);
      if (!comparePassword)
        throw new BadRequestException('Invalid current password');
      if (oldPassword === password)
        throw new BadRequestException(
          'New password cannot be the same as the current password',
        );
      const hashedPassword = await hashPass(password);
      await this.userService.updatePassword(id, hashedPassword);
      return { message: 'Password changed successfully' };
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'changePassword');
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
