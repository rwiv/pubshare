import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { RoleCreation } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.role.findMany();
  }

  findById(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  create(creation: RoleCreation) {
    return this.prisma.role.create({ data: creation });
  }

  delete(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
