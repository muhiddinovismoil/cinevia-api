import { registerAs } from '@nestjs/config';

export interface DBConfigOptions {
  url: string;
}

export const databaseConfig = registerAs<DBConfigOptions>(
  'database',
  (): DBConfigOptions => ({
    url: process.env.DATABASE_URL,
  }),
);
