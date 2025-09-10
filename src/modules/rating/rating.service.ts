import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ServiceExceptions } from '@utils';

import { CreateRatingDto, UpdateRatingDto } from './dto/request';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'create');
    }
  }

  async findAll() {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'findAll');
    }
  }

  async findOne(id: number) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'findOne');
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'update');
    }
  }

  async remove(id: number) {
    try {
    } catch (error) {
      ServiceExceptions.handle(error, RatingService.name, 'remove');
    }
  }
}
