import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleCreationPrisma } from '@/domain/permission/role/persistence/types';
import { RoleCreation } from '@/domain/permission/role/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  create(creation: RoleCreation) {
    const form: RoleCreationPrisma = {
      account: toPrismaConnect(creation.accountId),
      policy: toPrismaConnect(creation.policyId),
    };
    return this.roleRepository.create(form);
  }

  findById(id: number) {
    return this.roleRepository.findById(id);
  }

  findByAccountId(accountId: number) {
    return this.roleRepository.findByAccountId(accountId);
  }
}
