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
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'You already reviewed to this movie',
      };
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
      const [data, totalCount] = await this.prisma.$transaction([
        this.prisma.rating.findMany({
          where: { movieId },
          skip,
          take,
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                photo: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.rating.count({
          where: { movieId },
        }),
      ]);

      return {
        statusCode: HttpStatus.OK,
        message: 'Ratings of movie fetched successfully',
        data: data ?? [],
        meta: {
          totalCount,
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
          hasMore: skip + data.length < totalCount,
        },
      };
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'getRatingOfMovie');
    }
  }

  async removeRating(id: string, userId: string, movieId: string) {
    try {
      const isRatingExists = await this.prisma.rating.findFirst({
        where: { id, userId, movieId },
      });
      if (!isRatingExists) throw new NotFoundException('Rating not found');
      await this.prisma.rating.delete({ where: { id, userId, movieId } });
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Rating successfully removed',
      };
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'removeRating');
    }
  }
}
