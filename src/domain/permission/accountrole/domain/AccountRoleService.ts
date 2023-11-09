import { Injectable } from '@nestjs/common';
import { AccountRoleRepository } from '@/domain/permission/accountrole/persistence/AccountRoleRepository';
import { AccountRoleCreationPrisma } from '@/domain/permission/accountrole/persistence/types';
import {
  AccountRoleCreation,
  AccountRoleResponse,
} from '@/domain/permission/accountrole/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { PermissionException } from '@/domain/permission/common/PermissionException';

@Injectable()
export class AccountRoleService {
  constructor(
    private readonly roleRepository: AccountRoleRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(creation: AccountRoleCreation) {
    const exists = await this.roleRepository.findByAccountId(creation.accountId);
    const match = exists.filter((role) => role.roleId === creation.roleId);
    if (match.length > 0) {
      throw new PermissionException('duplicate roles cannot be registered in one account');
    }

    const form: AccountRoleCreationPrisma = {
      account: toPrismaConnect(creation.accountId),
      role: toPrismaConnect(creation.roleId),
    };
    return this.roleRepository.create(form);
  }

  findById(id: number) {
    return this.roleRepository.findById(id);
  }

  async findByAccountId(accountId: number) {
    const accountRoles = await this.roleRepository.findByAccountId(accountId);
    const result: AccountRoleResponse[] = [];
    for (const accountRole of accountRoles) {
      const role = await this.roleService.findById(accountRole.roleId);
      result.push({ id: accountRole.id, accountId: accountRole.accountId, role: role });
    }
    return result;
  }
}
