import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import { FilePolicyDummyBuilder } from '@/domain/permission/filepolicy/dev/FilePolicyDummyBuilder';

@Module({
  providers: [
    PrismaService,
    FilePolicyRepository,
    FilePolicyService,
    FilePolicyDummyBuilder,
  ],
  exports: [FilePolicyService],
})
export class FilePolicyModule {}
