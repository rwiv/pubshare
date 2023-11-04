import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/persistence/types';

@Injectable()
export class FileAuthorityRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: FileAuthorityCreation) {
    return this.prisma.fileAuthority.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.fileAuthority.findUnique({ where: { id } });
  }
}
