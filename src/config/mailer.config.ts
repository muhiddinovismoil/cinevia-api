import { registerAs } from '@nestjs/config';

export interface MailerConfigOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export const mailerConfig = registerAs<MailerConfigOptions>(
  'mailer',
  (): MailerConfigOptions => ({
    host: process.env.MAILER_HOST,
    pass: process.env.MAILER_PASS,
    port: +process.env.MAILER_PORT,
    user: process.env.MAILER_USER,
  }),
);
