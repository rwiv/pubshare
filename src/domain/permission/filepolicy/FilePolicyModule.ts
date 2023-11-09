import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import { FilePolicyDummyBuilder } from '@/domain/permission/filepolicy/dev/FilePolicyDummyBuilder';
import { FilePolicyController } from '@/domain/permission/filepolicy/web/FilePolicyController';
import { PolicyModule } from '@/domain/permission/policy/PolicyModule';

@Module({
  controllers: [FilePolicyController],
  providers: [
    PrismaService,
    FilePolicyRepository,
    FilePolicyService,
    FilePolicyDummyBuilder,
  ],
  imports: [PolicyModule],
  exports: [FilePolicyService],
})
export class FilePolicyModule {}
