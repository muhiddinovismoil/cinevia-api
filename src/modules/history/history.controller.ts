import { CurrentUser } from '@decorators';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { CreateHistoryDto } from './dto/request';
import { HistoryService } from './history.service';

@Controller('hisory')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@CurrentUser() user: ICurrentUser, @Body() payload: CreateHistoryDto) {
    return this.historyService.create({ ...payload, userId: user.id });
  }

  @Get()
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.historyService.findAll(user.id);
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
