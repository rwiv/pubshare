import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma.service';
import { FileCommentRepository } from '@/domain/file/comment/persistence/file.comment.repository';
import { FileCommentService } from '@/domain/file/comment/domain/file.comment.service';

@Module({
  providers: [PrismaService, FileCommentRepository, FileCommentService],
})
export class FileCommentModule {}
