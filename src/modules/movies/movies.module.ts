import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';

import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
