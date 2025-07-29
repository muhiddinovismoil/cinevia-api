import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
