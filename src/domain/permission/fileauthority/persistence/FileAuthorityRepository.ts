import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { FileAuthorityCreationPrisma } from '@/domain/permission/fileauthority/persistence/types';

@Injectable()
export class FileAuthorityRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileAuthorityCreationPrisma) {
    return this.prisma.fileAuthority.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileAuthority.findUnique({ where: { id } });
  }

  findByFileId(fileId: number) {
    return this.prisma.fileAuthority.findMany({ where: { fileId } });
  }
}
