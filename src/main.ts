import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CustomConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { port: PORT } = app.get(CustomConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Okten')
    .setDescription('NestJS API')
    .setVersion('1.0.0')
    .addTag('march-2023')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(PORT, () => {
    console.log('Server is runnig...', PORT);
  });
}

bootstrap();
