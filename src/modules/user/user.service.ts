import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create() {
    return 'This action adds a new ';
  }

  async findOneByCredentials(email: string) {
    try {
      return await this.prisma.user.findFirst({ where: { email } });
    } catch (error) {
      ServiceExceptions.handle(error, UserService.name, 'findOneByCredentials');
    }
  }

  findOne(id: string) {
    return `This action returns a #id `;
  }

  update(id: string) {
    return `This action updates a #id `;
  }

  remove(id: string) {
    return `This action removes a #id `;
  }
}
