import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cutil } from './util/cutil';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['log', 'debug', 'error', 'warn'],
  // });

  const conf = await cutil.getConf();
  if (conf.env === 'dev') {
    app.enableCors();
  }

  await app.listen(3000);
}
bootstrap();
