import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { WatchStatus } from '@prisma/client';
import { ServiceExceptions } from '@utils';

import { FindAllHistoryDto, UpsertHistoryDto } from './dto/request';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(
    userId: string,
    { episodeId, movieId, ...payload }: UpsertHistoryDto,
  ) {
    try {
      const where = episodeId
        ? { userId_movieId_episodeId: { userId, movieId, episodeId } }
        : { userId_movieId: { userId, movieId } };

      await this.prisma.watchHistory.upsert({
        where,
        update: {
          ...payload,
        },
        create: {
          userId,
          movieId,
          episodeId: episodeId ?? null,
          ...payload,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Watch history upsert successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'upsert');
    }
  }

  async findAll(userId: string, query?: FindAllHistoryDto) {
    try {
      const status = query.status;
      const skip = query.pageNumber
        ? (query.pageNumber - 1) * query.pageSize
        : undefined;
      const take = query.pageNumber ? query.pageSize : undefined;
      const data = await this.prisma.watchHistory.findMany({
        where: { userId, status: { equals: status } },
        include: {
          movie: true,
        },
        take,
        skip,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Watch history fetched successfully',
        data: data ?? [],
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'findAll');
    }
  }
}
