import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [PrismaModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
