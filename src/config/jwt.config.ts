import { registerAs } from '@nestjs/config';

export interface JwtConfigOptions {
  access: string;
  access_expires: string;
  refresh: string;
  refresh_expires: string;
}

export const jwtConfig = registerAs<JwtConfigOptions>(
  'jwt',
  (): JwtConfigOptions => ({
    access: process.env.JWT_ACCESS_TOKEN,
    access_expires: process.env.JWT_ACCESS_EXPIRES,
    refresh: process.env.JWT_REFRESH_TOKEN,
    refresh_expires: process.env.JWT_REFRESH_EXPIRES,
  }),
);
