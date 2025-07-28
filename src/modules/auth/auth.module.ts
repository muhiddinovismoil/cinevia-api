import { UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma';
import { AppMailService, RedisCacheService } from '@services';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, RedisCacheService, AppMailService],
})
export class AuthModule {}
