import { Injectable } from '@nestjs/common';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleCreation } from '@/domain/permission/role/domain/types';

@Injectable()
export class RoleDummyBuilder {
  constructor(private readonly roleService: RoleService) {}
  ro(accountId: number, policyId: number) {
    const creation: RoleCreation = { accountId, policyId };
    return this.roleService.create(creation);
  }
}
