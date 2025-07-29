import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { RoleTypes } from '@prisma/client';
import { ServiceExceptions } from '@utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create() {
    return 'This action adds a new ';
  }

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

  findOne(id: string) {
    return `This action returns a #id `;
  }

  async updatePassword(id: string, password: string) {
    try {
      await this.prisma.user.update({ where: { id }, data: { password } });
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'updatePassword');
    }
  }

  remove(id: string) {
    return `This action removes a #id `;
  }
}
