import { registerAs } from '@nestjs/config';

export interface DBConfigOptions {
  url: string;
  redis_url: string;
}

export const databaseConfig = registerAs<DBConfigOptions>(
  'database',
  (): DBConfigOptions => ({
    url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,
  }),
);
