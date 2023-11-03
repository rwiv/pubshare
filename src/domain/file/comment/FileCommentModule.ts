import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileCommentController } from '@/domain/file/comment/web/FileCommentController';

@Module({
  controllers: [FileCommentController],
  providers: [PrismaService, FileCommentRepository, FileCommentService],
})
export class FileCommentModule {}
