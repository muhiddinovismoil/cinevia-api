import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateHistoryDto, UpdateHistoryDto } from './dto/request';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateHistoryDto) {
    try {
      const data = await this.prisma.watchHistory.findFirst({
        where: {
          userId: payload.userId,
          movieId: payload.movieId,
          episodeId: payload.episodeId,
        },
      });
      if (data) throw new ConflictException('Watch history already exists');
      await this.prisma.watchHistory.create({ data: { ...payload } });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Watch history created successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'create');
    }
  }

  async findAll(id: string) {
    try {
      const data = await this.prisma.watchHistory.findMany({
        where: { userId: id },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Fetching history data successfully',
        data: data ?? [],
      };
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'findAll');
    }
  }

  async update(id: string, payload: UpdateHistoryDto) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'update');
    }
  }

  async remove(id: string) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, HistoryService.name, 'remove');
    }
  }
}
