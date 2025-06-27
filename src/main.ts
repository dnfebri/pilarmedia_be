import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllConfigType } from './shared/config/config.type';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { Swagger } from './swaggerModul';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  Swagger(app);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
