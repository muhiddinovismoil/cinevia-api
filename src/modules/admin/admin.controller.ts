import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Post()
  create() {}

  @Get()
  findAll() {}

  @Put('/:id')
  update() {}

  @Delete('/:id')
  delete() {}
}
