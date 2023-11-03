import { Module } from '@nestjs/common';
import { AccessController } from '@/domain/access/web/AccessController';
import { AccessService } from '@/domain/access/domain/AccessService';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
