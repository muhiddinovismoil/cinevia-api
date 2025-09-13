import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions, slugify } from '@utils';

import {
  CreateCategoryDto,
  FindAllDto,
  UpdateCategoryDto,
} from './dto/request';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCategoryDto) {
    try {
      const slug = slugify(payload.name);
      const isCategoryExisted = await this.prisma.category.findFirst({
        where: { name: payload.name, slug },
      });
      if (isCategoryExisted)
        throw new ConflictException('Category exists with this name');
      await this.prisma.category.create({ data: { slug: slug, ...payload } });
      return {
        statusCode: HttpStatus.OK,
        message: 'Category created successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, CategoryService.name, 'create');
    }
  }

  async findAll({ pageNumber, pageSize, search }: FindAllDto) {
    try {
      const skip = pageNumber ? (pageNumber - 1) * pageSize : undefined;
      const take = pageNumber ? pageSize : undefined;
      const [data, total] = await this.prisma.$transaction([
        this.prisma.category.findMany({
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          where: search
            ? {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : undefined,
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
      const slug = slugify(payload.name);
      const newDataIsExisted = await this.prisma.category.findFirst({
        where: { slug, name: payload.name },
      });
      if (newDataIsExisted)
        throw new ConflictException('This slug and name already existed');
      await this.prisma.category.update({
        where: { id },
        data: { slug: slug, ...payload },
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
