import { Module } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/FileRepository';
import { FileService } from '@/domain/file/file/domain/FileService';
import { PrismaService } from '@/misc/PrismaService';

@Module({
  providers: [PrismaService, FileRepository, FileService],
})
export class FileModule {}
