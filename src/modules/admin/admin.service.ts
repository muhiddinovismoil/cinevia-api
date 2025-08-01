import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async statistics(id: string) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, AdminService.name, 'statistics');
    }
  }
}
