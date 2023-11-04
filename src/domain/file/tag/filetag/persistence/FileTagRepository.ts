import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileTagCreation) {
    return this.prisma.fileTag.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileTag.findUnique({ where: { id } });
  }
}
