import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';

@Module({
  providers: [PrismaService, FileCommentRepository, FileCommentService],
})
export class FileCommentModule {}
