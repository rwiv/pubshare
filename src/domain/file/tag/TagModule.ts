import { Module } from '@nestjs/common';
import { TagRepository } from '@/domain/file/tag/tag/persistence/TagRepository';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { PrismaService } from '@/misc/prisma/PrismaService';

@Module({
  providers: [PrismaService, TagRepository, FileTagRepository],
})
export class TagModule {}
