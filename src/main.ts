import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigOptions } from 'config/app.config';
import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { join } from 'path';

import { AppModule } from './app';

const collapsed = `setTimeout(() => {
    document.querySelectorAll('.opblock-tag').forEach(item => item.click())
    document.querySelector('.models-control').click()
  },200);
  `;
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfigOptions>('app');
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(
    '/api/docs',
    basicAuth({
      challenge: true,
      users: {
        admin: appConfig.doc_password,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('API for Movie site')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
    customJsStr: collapsed,
  });

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger route: http://${appConfig.host}:${appConfig.port}/api/docs`,
    );
  });
}
bootstrap()
  .then(() => {
    logger.log(`Server is running on port: [${process.env['APP_PORT']}]`);
  })
  .catch((err) => {
    logger.log(`Error is occurred during initialization the server: [${err}]`);
  });
