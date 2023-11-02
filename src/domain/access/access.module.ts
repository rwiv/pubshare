import { Module } from '@nestjs/common';
import { AccessController } from '@/domain/access/web/access.controller';
import { AccessService } from '@/domain/access/domain/access.service';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
