import { NestFactory } from '@nestjs/core';
import { getConf } from '@/util/cutil';
import { AppModule } from '@/AppModule';
import { WebExceptionFilter } from '@/misc/error/filter/WebExceptionFilter';
import { ConvertJsExceptionFilter } from '@/misc/error/filter/ConvertJsExceptionFilter';
import { ConvertNestExceptionFilter } from '@/misc/error/filter/ConvertNestExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {
  //   logger: ['log', 'debug', 'error', 'warn'],
  // });

  const conf = await getConf();
  if (conf.env === 'dev') {
    app.enableCors();
  }

  // 이 순서를 유지해야함
  // 그렇지 않으면 ConvertExceptionFilter가 먼저 처리되어버림
  app.useGlobalFilters(new ConvertJsExceptionFilter());
  app.useGlobalFilters(new ConvertNestExceptionFilter());
  app.useGlobalFilters(new WebExceptionFilter());

  await app.listen(3000);
}
bootstrap();
