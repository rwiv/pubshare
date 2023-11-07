import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { RoleCreationPrisma } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: RoleCreationPrisma) {
    return this.prisma.role.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  findByAccountId(accountId: number) {
    return this.prisma.role.findMany({ where: { accountId } });
  }
}
