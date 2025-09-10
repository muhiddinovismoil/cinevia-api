import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('rating')
export class RatingController {
  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
