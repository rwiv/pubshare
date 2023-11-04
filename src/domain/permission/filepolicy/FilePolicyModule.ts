import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';

@Module({
  providers: [PrismaService, FilePolicyRepository, FilePolicyService],
})
export class FilePolicyModule {}
