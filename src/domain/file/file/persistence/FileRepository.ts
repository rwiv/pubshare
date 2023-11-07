import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FileCreation } from '@/domain/file/file/persistence/types';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileCreation) {
    return this.prisma.file.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  findByPath(path: string) {
    return this.prisma.file.findUnique({ where: { path } });
  }

  delete(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }
}
