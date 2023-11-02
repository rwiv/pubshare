import { NestFactory } from '@nestjs/core';
import { getConf } from '@/util/cutil';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['log', 'debug', 'error', 'warn'],
  // });

  const conf = await getConf();
  if (conf.env === 'dev') {
    app.enableCors();
  }

  await app.listen(3000);
}
bootstrap();
