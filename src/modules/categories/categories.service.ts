import { BaseFindDto } from '@dtos';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateCategoryDto, UpdateCategoryDto } from './dto/request';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCategoryDto) {
    try {
      const isCategoryExisted = await this.prisma.category.findFirst({
        where: { name: payload.name },
      });
      if (isCategoryExisted)
        throw new ConflictException('Category exists with this name');
      await this.prisma.category.create({ data: { ...payload } });
      return {
        statusCode: HttpStatus.OK,
        message: 'Category created successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'create');
    }
  }

  async findAll({ pageNumber, pageSize }: BaseFindDto) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const take = pageSize;
      const [data, total] = await this.prisma.$transaction([
        this.prisma.category.findMany({
          skip,
          take,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.category.count(),
      ]);

      return {
        message: 'All Categories fetched',
        data,
        meta: {
          total,
          pageNumber,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'findAll');
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.category.findFirst({
        where: { id },
        include: {
          movies: true,
        },
      });
      if (!data) throw new NotFoundException('Category not found');
      return {
        statusCode: HttpStatus.OK,
        message: 'Category fetched successfully',
        data,
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'findOne');
    }
  }

  async update(id: string, payload: UpdateCategoryDto) {
    try {
      const data = await this.findOne(id);
      await this.prisma.category.update({
        where: { id },
        data: { ...payload },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'update');
    }
  }

  async removeCategory(id: string) {
    try {
      const data = await this.findOne(id);
      await this.prisma.category.delete({ where: { id } });
      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'removeCategory');
    }
  }
}
