import { registerAs } from '@nestjs/config';

import * as os from 'os';

export interface AppConfigOptions {
  port: number;
  doc_password: string;
}

export const appConfig = registerAs<AppConfigOptions>(
  'app',
  (): AppConfigOptions => ({
    port: +process.env.APP_PORT,
    doc_password: process.env.DOC_PASSWORD,
  }),
);

export function getLocalIP(): string {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}
