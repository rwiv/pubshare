import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleCreationPrisma } from '@/domain/permission/role/persistence/types';
import {
  RoleCreation,
  RoleResponse,
} from '@/domain/permission/role/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PermissionException } from '@/domain/permission/common/PermissionException';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly policyService: PolicyService,
  ) {}

  async create(creation: RoleCreation) {
    const exists = await this.roleRepository.findByAccountId(creation.accountId);
    const match = exists.filter((role) => role.policyId === creation.policyId);
    if (match.length > 0) {
      throw new PermissionException('duplicate policies cannot be registered in one account');
    }

    const form: RoleCreationPrisma = {
      account: toPrismaConnect(creation.accountId),
      policy: toPrismaConnect(creation.policyId),
    };
    return this.roleRepository.create(form);
  }

  findById(id: number) {
    return this.roleRepository.findById(id);
  }

  async findByAccountId(accountId: number) {
    const roles = await this.roleRepository.findByAccountId(accountId);
    const result: RoleResponse[] = [];
    for (const role of roles) {
      const policy = await this.policyService.findById(role.policyId);
      result.push({ id: role.id, accountId: role.accountId, policy });
    }
    return result;
  }
}
