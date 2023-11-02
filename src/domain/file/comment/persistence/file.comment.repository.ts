import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma.service';
import { FileCommentModel } from '@/domain/file/comment/persistence/prisma';
import {FileCommentCreation} from "@/domain/file/comment/domain/types";

@Injectable()
export class FileCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<FileCommentModel> {
    return this.prisma.fileComment.findUnique({ where: { id } });
  }

  create(creation: FileCommentCreation): Promise<FileCommentModel> {
    return this.prisma.fileComment.create({ data: creation });
  }
}
