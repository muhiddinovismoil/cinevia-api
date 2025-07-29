import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('file')
export class FileController {
  @Post()
  create() {}
}
