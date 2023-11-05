import { Module } from '@nestjs/common';
import { TagRepository } from '@/domain/file/tag/tag/persistence/TagRepository';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileTagService } from '@/domain/file/tag/filetag/domain/FileTagService';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';

@Module({
  providers: [
    PrismaService,
    TagRepository,
    TagService,
    FileTagRepository,
    FileTagService,
  ],
})
export class TagModule {}
