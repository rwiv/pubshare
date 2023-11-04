import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';
import { RoleCreation } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  create(creation: RoleCreation) {
    return this.prisma.role.create({ data: creation });
  }
}
