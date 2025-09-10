import { CurrentUser } from '@decorators';
import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { CreateHistoryDto, UpdateHistoryDto } from './dto/request';
import { HistoryService } from './history.service';

@Controller('hisory')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@CurrentUser() user: ICurrentUser, @Body() payload: CreateHistoryDto) {
    return this.historyService.create({ ...payload, userId: user.id });
  }

  @Patch('/update')
  update(@CurrentUser() user: ICurrentUser, @Body() payload: UpdateHistoryDto) {
    return this.historyService.update({ ...payload, userId: user.id });
  }
}
