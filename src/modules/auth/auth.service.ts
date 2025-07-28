import { UserService } from '@modules';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma';
import { RoleTypes } from '@prisma/client';
import { ServiceExceptions, hashPass } from '@utils';

import { SignInUserDto, SignUpUserDto } from './dto/request';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async create(payload: SignUpUserDto) {
    try {
      const user = await this.userService.findOneByCredentials(payload.email);
      if (user)
        throw new ConflictException('User with this email already exists');
      const hashedPass = await hashPass(payload.password);
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'create');
    }
  }

  async signin(payload: SignInUserDto) {
    try {
      const user = await this.userService.findOneByCredentials(payload.email);
      if (user) throw new ForbiddenException('You do not have access to login');
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'signin');
    }
  }

  async signinAsAdmin(payload: SignInUserDto) {
    try {
      const user = await this.userService.findOneByCredentials(
        payload.email,
        RoleTypes.ADMIN,
      );
      if (!user) {
        throw new ForbiddenException('You do not have access to login');
      }
    } catch (error) {
      ServiceExceptions.handle(error, AuthService.name, 'signinAsAdmin');
    }
  }

  update(id: string) {
    return `This action updates a #id `;
  }

  remove(id: string) {
    return `This action removes a #id `;
  }
}
