import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  create(creation: FileCreation) {
    return this.prisma.file.create({ data: creation });
  }
}
