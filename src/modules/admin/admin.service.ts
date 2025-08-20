import { SortEnum } from '@enums';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Prisma, RoleTypes } from '@prisma/client';
import { ServiceExceptions } from '@utils';

import { FindAllUsersDto } from './dto/request';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async statistics() {
    try {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );

      const [usersCount, newUsersThisMonth, totalSeries, moviesCount] =
        await Promise.all([
          this.prisma.user.count({
            where: {
              role: {
                not: 'ADMIN',
              },
            },
          }),
          this.prisma.user.count({
            where: {
              role: {
                not: 'ADMIN',
              },
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          }),
          this.prisma.movie.count({
            where: {
              seasons: {
                some: {},
              },
            },
          }),
          this.prisma.movie.count({}),
        ]);

      return {
        message: 'Main statistics successfully finished',
        data: {
          usersCount,
          newUsersThisMonth,
          totalSeries,
          moviesCount,
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, AdminService.name, 'statistics');
    }
  }

  async getAllUsers({ search, sort, pageNumber, pageSize }: FindAllUsersDto) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const take = pageSize;
      const orderBy: Prisma.UserOrderByWithRelationInput = {
        fullname:
          sort === SortEnum.TITLE_ASC
            ? 'asc'
            : sort === SortEnum.TITLE_DESC
              ? 'desc'
              : undefined,
        createdAt:
          sort === SortEnum.DATE_ASC
            ? 'asc'
            : sort === SortEnum.DATE_DESC
              ? 'desc'
              : undefined,
      };
      const [data, total] = await Promise.all([
        await this.prisma.user.findMany({
          where: {
            role: { not: RoleTypes.ADMIN },
            fullname: !search
              ? undefined
              : {
                  contains: search,
                  mode: 'insensitive',
                },
          },
          select: {
            id: true,
            photo: true,
            email: true,
            fullname: true,
            createdAt: true,
            updatedAt: true,
          },
          skip,
          take,
          orderBy,
        }),
        await this.prisma.user.count({
          where: { role: { not: RoleTypes.ADMIN } },
        }),
      ]);
      return {
        message: 'Users successfully fetched',
        statusCode: HttpStatus.OK,
        data: data ?? [],
        meta: {
          total,
          pageNumber: pageNumber,
          pageSize: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, AdminService.name, 'getAllUsers');
    }
  }
}
