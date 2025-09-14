import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { UpsertHistoryDto } from './dto/request';

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
}
