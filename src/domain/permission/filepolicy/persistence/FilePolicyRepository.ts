import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';
import { FilePolicyCreation } from '@/domain/permission/filepolicy/persistence/types';

@Injectable()
export class FilePolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.filePolicy.findUnique({ where: { id } });
  }

  create(creation: FilePolicyCreation) {
    return this.prisma.filePolicy.create({ data: creation });
  }
}
