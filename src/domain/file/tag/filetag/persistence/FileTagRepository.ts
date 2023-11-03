import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.fileTag.findUnique({ where: { id } });
  }

  create(creation: FileTagCreation) {
    return this.prisma.fileTag.create({ data: creation });
  }
}
