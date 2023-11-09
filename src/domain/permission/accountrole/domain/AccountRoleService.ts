import { Injectable } from '@nestjs/common';
import { AccountRoleRepository } from '@/domain/permission/accountrole/persistence/AccountRoleRepository';
import { AccountRoleCreationPrisma } from '@/domain/permission/accountrole/persistence/types';
import {
  AccountRoleCreation,
  AccountRoleResponse,
} from '@/domain/permission/accountrole/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PermissionException } from '@/domain/permission/common/PermissionException';

@Injectable()
export class AccountRoleService {
  constructor(
    private readonly roleRepository: AccountRoleRepository,
    private readonly policyService: PolicyService,
  ) {}

  async create(creation: AccountRoleCreation) {
    const exists = await this.roleRepository.findByAccountId(creation.accountId);
    const match = exists.filter((role) => role.policyId === creation.policyId);
    if (match.length > 0) {
      throw new PermissionException('duplicate policies cannot be registered in one account');
    }

    const form: AccountRoleCreationPrisma = {
      account: toPrismaConnect(creation.accountId),
      policy: toPrismaConnect(creation.policyId),
    };
    return this.roleRepository.create(form);
  }

  findById(id: number) {
    return this.roleRepository.findById(id);
  }

  async findByAccountId(accountId: number) {
    const accountRoles = await this.roleRepository.findByAccountId(accountId);
    const result: AccountRoleResponse[] = [];
    for (const role of accountRoles) {
      const policy = await this.policyService.findById(role.policyId);
      result.push({ id: role.id, accountId: role.accountId, policy });
    }
    return result;
  }
}
