import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FilePolicyCreationPrisma } from '@/domain/permission/filepolicy/persistence/types';

@Injectable()
export class FilePolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FilePolicyCreationPrisma) {
    return this.prisma.filePolicy.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.filePolicy.findUnique({ where: { id } });
  }

  findByFileId(fileId: number) {
    return this.prisma.filePolicy.findMany({ where: { fileId } });
  }
}
