import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileCommentCreationPrisma } from '@/domain/file/comment/persistence/types';

@Injectable()
export class FileCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileCommentCreationPrisma) {
    return this.prisma.fileComment.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileComment.findUnique({ where: { id } });
  }

  findByIdFull(id: number) {
    return this.prisma.fileComment.findUnique({
      where: { id },
      include: {
        file: true,
        createdBy: true,
      },
    });
  }

  findByFileId(fileId: number) {
    return this.prisma.fileComment.findMany({
      where: { fileId },
    });
  }

  delete(id: number) {
    return this.prisma.fileComment.delete({ where: { id }});
  }
}
