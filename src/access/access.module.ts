import { Module } from '@nestjs/common';
import { AccessController } from './web/access.controller';
import { AccessService } from './domain/access.service';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
