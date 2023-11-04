import { Injectable } from '@nestjs/common';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleCreation } from '@/domain/permission/role/persistence/types';

@Injectable()
export class RoleDummyBuilder {
  constructor(private readonly roleService: RoleService) {}
  ro(accountId: number, policyId: number) {
    const creation: RoleCreation = {
      account: { connect: { id: accountId } },
      policy: { connect: { id: policyId } },
    };
    return this.roleService.create(creation);
  }
}
