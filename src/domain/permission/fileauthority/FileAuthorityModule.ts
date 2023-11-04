import { Module } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { PrismaService } from '@/misc/PrismaService';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';

@Module({
  providers: [PrismaService, FileAuthorityRepository, FileAuthorityService],
})
export class FileAuthorityModule {}
