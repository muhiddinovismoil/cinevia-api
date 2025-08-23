import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';

import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [PrismaModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
