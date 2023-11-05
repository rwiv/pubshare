import { Module } from '@nestjs/common';
import { TagRepository } from '@/domain/file/tag/tag/persistence/TagRepository';
import { FileTagRepository } from '@/domain/file/tag/filetag/persistence/FileTagRepository';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileTagService } from '@/domain/file/tag/filetag/domain/FileTagService';
import { TagService } from '@/domain/file/tag/tag/domain/TagService';
import { FileTagController } from '@/domain/file/tag/filetag/web/FileTagController';
import { TagController } from '@/domain/file/tag/tag/web/TagController';

@Module({
  controllers: [TagController, FileTagController],
  providers: [
    PrismaService,
    TagRepository,
    TagService,
    FileTagRepository,
    FileTagService,
  ],
})
export class TagModule {}
