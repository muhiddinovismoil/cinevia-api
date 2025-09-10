import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
