import { Injectable } from '@nestjs/common';
import { AccountRoleService } from '@/domain/permission/accountrole/domain/AccountRoleService';
import { AccountRoleCreation } from '@/domain/permission/accountrole/domain/types';

@Injectable()
export class AccountRoleDummyBuilder {
  constructor(private readonly roleService: AccountRoleService) {}
  ro(accountId: number, policyId: number) {
    const creation: AccountRoleCreation = { accountId, policyId };
    return this.roleService.create(creation);
  }
}
