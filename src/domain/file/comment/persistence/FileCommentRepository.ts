import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { FileCommentCreation } from '@/domain/file/comment/domain/types';

@Injectable()
export class FileCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  create(creation: FileCommentCreation) {
    return this.prisma.fileComment.create({ data: creation });
  }
}
