import { PrismaService } from '@/misc/prisma.service';
import { FileModel } from '@/domain/file/file/persistence/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number): Promise<FileModel> {
    return this.prisma.file.findUnique({ where: { id } });
  }

  create(creation: FileCreation): Promise<FileModel> {
    return this.prisma.file.create({ data: creation });
  }
}
