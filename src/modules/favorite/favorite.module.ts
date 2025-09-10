import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';

import { FavouriteController } from './favorite.controller';
import { FavouriteService } from './favorite.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}
