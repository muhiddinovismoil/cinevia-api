import { AuthModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig } from 'config';
import { PrismaModule } from 'prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
