import { AuthModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { appConfig, databaseConfig } from 'config';
import { PrismaModule } from 'prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 3,
      },
    ]),
    JwtModule.register({ global: true }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  providers: [{ provide: 'APP_GUARD', useClass: ThrottlerGuard }],
})
export class AppModule {}
