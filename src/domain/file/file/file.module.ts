import { Module } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/file.repository';
import { FileService } from '@/domain/file/file/domain/file.service';
import { PrismaService } from '@/misc/prisma.service';

@Module({
  providers: [PrismaService, FileRepository, FileService],
})
export class FileModule {}
