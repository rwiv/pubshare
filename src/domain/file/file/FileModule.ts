import { Module } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/FileRepository';
import { FileService } from '@/domain/file/file/domain/FileService';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileDummyBuilder } from '@/domain/file/file/dev/FileDummyBuilder';

@Module({
  providers: [PrismaService, FileRepository, FileService, FileDummyBuilder],
  exports: [FileService],
})
export class FileModule {}
