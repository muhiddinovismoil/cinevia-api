import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import {
  CreateRatingDto,
  FindRatingsDto,
  UpdateRatingDto,
} from './dto/request';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, { movieId, ...payload }: CreateRatingDto) {
    try {
      const data = await this.prisma.rating.findFirst({
        where: { userId, movieId },
      });
      if (!data) {
        await this.prisma.rating.create({
          data: { movieId, userId, ...payload },
        });
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Rating created successfully',
        };
      }
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'create');
    }
  }

  async update(
    id: string,
    userId: string,
    { movieId, ...payload }: UpdateRatingDto,
  ) {
    try {
      const data = await this.prisma.rating.findUnique({
        where: { id, userId_movieId: { userId, movieId } },
      });
      if (!data) throw new NotFoundException('Rating not found');
      await this.prisma.rating.update({
        where: { id, userId_movieId: { movieId, userId } },
        data: { ...payload },
      });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Rating updated successfully',
      };
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'update');
    }
  }

  async getRatingOfMovie(movieId: string, query: FindRatingsDto) {
    try {
      const skip = query.pageNumber
        ? (query.pageNumber - 1) * query.pageSize
        : undefined;
      const take = query.pageSize ? query.pageSize : undefined;
      const data = await this.prisma.rating.findMany({
        where: { movieId },
        select: {
          id: true,
          createdAt: true,
          rating: true,
          review: true,
          user: {
            select: { id: true, fullname: true, photo: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Ratings of movie fetched successfully',
        data: data ?? [],
      };
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'getRatingOfMovie');
    }
  }
}
