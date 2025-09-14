import { CurrentUser } from '@decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ICurrentUser } from '@type';

import { UpsertHistoryDto } from './dto/request';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  upsert(@CurrentUser() user: ICurrentUser, @Body() payload: UpsertHistoryDto) {
    return this.historyService.upsert(user.id, payload);
  }
}
