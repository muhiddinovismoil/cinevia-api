import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';

import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
