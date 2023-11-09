import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FileRoleCreationPrisma } from '@/domain/permission/filerole/persistence/types';

@Injectable()
export class FileRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileRoleCreationPrisma) {
    return this.prisma.fileRole.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileRole.findUnique({ where: { id } });
  }

  findByFileId(fileId: number) {
    return this.prisma.fileRole.findMany({ where: { fileId } });
  }

  delete(id: number) {
    return this.prisma.fileRole.delete({ where: { id } });
  }
}
