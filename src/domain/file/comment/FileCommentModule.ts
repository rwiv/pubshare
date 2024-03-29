import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileCommentController } from '@/domain/file/comment/web/FileCommentController';
import { AccountModule } from '@/domain/account/AccountModule';

@Module({
  controllers: [FileCommentController],
  providers: [PrismaService, FileCommentRepository, FileCommentService],
  imports: [AccountModule],
})
export class FileCommentModule {}
