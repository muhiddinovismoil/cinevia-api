import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'create');
    }
  }

  async findAll() {
    try {
      return (await this.prisma.category.findMany()) ?? [];
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'findAll');
    }
  }

  findOne() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'findOne');
    }
  }

  update() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'update');
    }
  }
}
