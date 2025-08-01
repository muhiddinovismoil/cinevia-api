import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { RoleTypes } from '@prisma/client';
import { ServiceExceptions } from '@utils';

import { UpdateProfileDto } from './dto/request';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByCredentials(email: string, role?: RoleTypes) {
    try {
      if (!role) {
        return await this.prisma.user.findFirst({ where: { email } });
      } else {
        return await this.prisma.user.findFirst({ where: { email, role } });
      }
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'findOneByCredentials');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        select: { id: true, fullname: true, photo: true, email: true },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'findOne');
    }
  }

  async updatePassword(id: string, password: string) {
    try {
      await this.prisma.user.update({ where: { id }, data: { password } });
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'updatePassword');
    }
  }

  async updateProfile(id: string, payload: UpdateProfileDto) {
    try {
      const data = this.findOne(id);
      const isValidEmail = await this.prisma.user.findFirst({
        where: { email: payload.email, NOT: { id } },
      });
      if (isValidEmail)
        throw new BadRequestException(
          'This email is already registered before',
        );
      const updatedData = await this.prisma.user.update({
        where: { id },
        data: {
          fullname: payload.fullname,
          email: payload.email,
          photo: payload.photo,
        },
        select: {
          id: true,
          fullname: true,
          photo: true,
          email: true,
        },
      });
      return { message: 'Profile updated successfully', data: updatedData };
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'updateProfile');
    }
  }
}
