import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
