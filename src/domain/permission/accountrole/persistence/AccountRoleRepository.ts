import { PrismaService } from '@/misc/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { AccountRoleCreationPrisma } from '@/domain/permission/accountrole/persistence/types';

@Injectable()
export class AccountRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(creation: AccountRoleCreationPrisma) {
    return this.prisma.accountRole.create({ data: creation });
  }

  findById(id: number) {
    return this.prisma.accountRole.findUnique({ where: { id } });
  }

  findByAccountId(accountId: number) {
    return this.prisma.accountRole.findMany({ where: { accountId } });
  }
}
