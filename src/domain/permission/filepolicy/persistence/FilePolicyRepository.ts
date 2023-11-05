import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FilePolicyCreation } from '@/domain/permission/filepolicy/persistence/types';

@Injectable()
export class FilePolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FilePolicyCreation) {
    return this.prisma.filePolicy.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.filePolicy.findUnique({ where: { id } });
  }

  findByFileId(fileId: number) {
    return this.prisma.filePolicy.findMany({ where: { fileId } });
  }
}
