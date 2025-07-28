import { AuthModule, UserModule } from '@modules';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { appConfig, databaseConfig, jwtConfig, mailerConfig } from 'config';
import { join } from 'path';
import { PrismaModule } from 'prisma';

@Module({
  imports: [
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
          template: {
            dir: join(__dirname, 'service'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
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
  ],
  providers: [{ provide: 'APP_GUARD', useClass: ThrottlerGuard }],
})
export class AppModule {}
