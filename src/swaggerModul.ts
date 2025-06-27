import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { AppAdminModule } from './app-admin/module';
import { AppUserModule } from './app-user/module';

export const Swagger = (
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) => {
  SwaggerModule.setup(
    'docs/admin',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
      { include: [...AppAdminModule] },
    ),
    { swaggerOptions: { persistAuthorization: true } },
  );

  SwaggerModule.setup(
    'docs/user',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
      { include: [...AppUserModule] },
    ),
    { swaggerOptions: { persistAuthorization: true } },
  );
};
