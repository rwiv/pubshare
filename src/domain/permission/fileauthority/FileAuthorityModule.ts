import { Module } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FileAuthorityDummyBuilder } from '@/domain/permission/fileauthority/dev/FileAuthorityDummyBuilder';

@Module({
  providers: [
    PrismaService,
    FileAuthorityRepository,
    FileAuthorityService,
    FileAuthorityDummyBuilder,
  ],
  exports: [FileAuthorityService],
})
export class FileAuthorityModule {}
