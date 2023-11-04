import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FileCommentCreation } from '@/domain/file/comment/persistence/types';

@Injectable()
export class FileCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileCommentCreation) {
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
        parent: true,
        children: true,
      },
    });
  }

  findByFileId(fileId: number) {
    return this.prisma.fileComment.findMany({
      where: { fileId },
    });
  }
}
