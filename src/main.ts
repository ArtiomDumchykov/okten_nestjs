import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
// import { configs } from './config';
import { CustomConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { port: PORT } = app.get(CustomConfigService);
  await app.listen(PORT, () => {
    console.log('Server is runnig...', PORT);
  });
}

bootstrap();
