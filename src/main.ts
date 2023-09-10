import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['log', 'debug', 'error', 'warn'],
  // });
  await app.listen(3000);
}
bootstrap();
