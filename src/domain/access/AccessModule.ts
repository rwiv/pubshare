import { Module } from '@nestjs/common';
import { AccessController } from '@/domain/access/web/AccessController';
import { AccessService } from '@/domain/access/domain/AccessService';
import { FileModule } from '@/domain/file/file/FileModule';
import { PermissionVerifierModule } from '@/domain/permission/verifier/PermissionVerifierModule';

@Module({
  controllers: [AccessController],
  providers: [AccessService],
  imports: [FileModule, PermissionVerifierModule],
})
export class AccessModule {}
