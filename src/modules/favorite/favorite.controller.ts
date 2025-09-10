import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('favourite')
export class FavouriteController {
  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
