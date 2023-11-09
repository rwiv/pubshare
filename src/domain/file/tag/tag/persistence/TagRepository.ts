import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: TagCreation) {
    return this.prisma.tag.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return this.prisma.tag.findUnique({ where: { name } });
  }

  delete(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
