import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { WatchStatus } from '@prisma/client';
import { ServiceExceptions } from '@utils';

import { CreateHistoryDto, UpdateHistoryDto } from './dto/request';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ episodeId, userId, movieId, ...payload }: CreateHistoryDto) {
    try {
      const data = await this.prisma.watchHistory.findFirst({
        where: { episodeId, userId, movieId },
      });
      if (data) throw new ConflictException('Watch history already exists');
      await this.prisma.watchHistory.create({
        data: { episodeId, userId, movieId, ...payload },
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Watch history created successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'create');
    }
  }

  async update({ episodeId, movieId, userId, ...payload }: UpdateHistoryDto) {
    try {
      const historyExists = await this.prisma.watchHistory.findUnique({
        where: {
          userId_movieId_episodeId: { userId, movieId, episodeId },
        },
      });
      if (
        !historyExists ||
        historyExists.isCompleted ||
        historyExists.status === WatchStatus.COMPLETED
      ) {
        throw new NotFoundException(
          'Watch history not found or already Completed',
        );
      }
      await this.prisma.watchHistory.update({
        where: {
          userId_movieId_episodeId: {
            userId,
            movieId,
            episodeId,
          },
        },
        data: {
          ...payload,
          watchedDuration:
            (payload.watchedDuration ?? 0) + historyExists.watchedDuration,
        },
      });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Watch history successfull updated',
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'update');
    }
  }
}
