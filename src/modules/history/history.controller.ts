import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { HistoryService } from './history.service';

@Controller('hisory')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create() {
    return this.historyService.create({});
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get('/:id')
  findOne() {
    return this.historyService.findOne('');
  }

  @Patch('/:id')
  update() {
    return this.historyService.update('', {});
  }

  @Delete('/:id')
  delete() {
    return this.historyService.remove('');
  }
}
