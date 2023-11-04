import { PrismaService } from '@/misc/PrismaService';
import { Injectable } from '@nestjs/common';
import { PolicyCreation } from '@/domain/permission/policy/persistence/types';

@Injectable()
export class PolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  create(creation: PolicyCreation) {
    return this.prisma.tag.create({ data: creation });
  }
}
