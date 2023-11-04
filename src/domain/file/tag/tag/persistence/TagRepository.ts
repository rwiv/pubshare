import { PrismaService } from '@/misc/PrismaService';
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
}