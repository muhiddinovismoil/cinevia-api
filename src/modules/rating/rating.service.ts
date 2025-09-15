import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateRatingDto, UpdateRatingDto } from './dto/request';

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

  async update(userId: string, { movieId, ...payload }: UpdateRatingDto) {
    try {
      const data = await this.prisma.rating.findUnique({
        where: { userId_movieId: { userId, movieId } },
      });
      if (!data) throw new NotFoundException('Rating not found');
      await this.prisma.rating.update({
        where: { userId_movieId: { movieId, userId } },
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
}
