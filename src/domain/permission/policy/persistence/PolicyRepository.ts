import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { PolicyCreation } from '@/domain/permission/policy/persistence/types';

@Injectable()
export class PolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.policy.findMany();
  }

  findById(id: number) {
    return this.prisma.policy.findUnique({ where: { id } });
  }

  create(creation: PolicyCreation) {
    return this.prisma.policy.create({ data: creation });
  }
}
