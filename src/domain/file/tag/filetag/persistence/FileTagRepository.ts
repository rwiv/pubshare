import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FileTagCreation } from '@/domain/file/tag/filetag/persistence/types';

@Injectable()
export class FileTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileTagCreation) {
    return this.prisma.fileTag.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileTag.findUnique({ where: { id } });
  }

  findByFileId(fileId: number) {
    return this.prisma.fileTag.findMany({ where: { fileId } });
  }

  findByTagId(tagId: number) {
    return this.prisma.fileTag.findMany({ where: { tagId } });
  }
}
