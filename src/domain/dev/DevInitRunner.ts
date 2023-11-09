import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import { accountTypes } from '@/domain/account/persistence/accountType';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';
import { RoleDummyBuilder } from '@/domain/permission/role/dev/RoleDummyBuilder';
import { RoleService } from '@/domain/permission/role/domain/RoleService';

@Injectable()
export class DevInitRunner implements OnApplicationBootstrap {
  constructor(
    private readonly accountService: AccountService,
    private readonly ac: AccountDummyBuilder,
    private readonly roleService: RoleService,
    private readonly pl: RoleDummyBuilder,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const accounts = await this.accountService.findAll();
    if (accounts.length === 0) {
      await this.ac.acDt2('test1', '1234', accountTypes.MEMBER, false);
      await this.ac.acDt2('test2', '1234', accountTypes.MEMBER, false);
      await this.ac.acDt1('admin', accountTypes.ADMIN, true);
      await this.ac.acDt1('member', accountTypes.MEMBER, true);
    }

    const roles = await this.roleService.findAll();
    if (roles.length === 0) {
      await this.pl.pl(1);
      await this.pl.pl(2);
    }

    console.log(accounts);
  }
}
