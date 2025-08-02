import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

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
}
