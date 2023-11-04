import { PrismaService } from '@/misc/PrismaService';
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
}
