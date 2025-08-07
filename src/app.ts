import { RolesGuard } from '@guards';
import {
  AdminModule,
  AuthModule,
  CategoryModule,
  FileModule,
  MovieModule,
  UserModule,
} from '@modules';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from 'common/guards/auth.guard';
import { appConfig, databaseConfig, jwtConfig, mailerConfig } from 'config';
import { PrismaModule } from 'prisma';
import { CronService } from 'services/cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, jwtConfig, mailerConfig],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 3,
      },
    ]),
    MulterModule.register({
      dest: '/uploads',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mailConfig = configService.get('mailer');
        return {
          transport: {
            host: mailConfig.host,
            port: mailConfig.port,
            secure: false,
            auth: {
              user: mailConfig.user,
              pass: mailConfig.pass,
            },
          },
        };
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        return {
          type: 'single',
          url: databaseConfig,
        };
      },
    }),
    JwtModule.register({ global: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    MovieModule,
    AdminModule,
    CategoryModule,
    FileModule,
  ],
  providers: [
    CronService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
