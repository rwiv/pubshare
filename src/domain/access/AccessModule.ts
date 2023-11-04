import { Module } from '@nestjs/common';
import { AccessController } from '@/domain/access/web/AccessController';
import { AccessService } from '@/domain/access/domain/AccessService';
import { FileModule } from '@/domain/file/file/FileModule';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
  imports: [FileModule],
})
export class AccessModule {}
