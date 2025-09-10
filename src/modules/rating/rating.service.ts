import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateRatingDto, UpdateRatingDto } from './dto/request';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateRatingDto) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'create');
    }
  }

  async update(payload: UpdateRatingDto) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'update');
    }
  }
}
