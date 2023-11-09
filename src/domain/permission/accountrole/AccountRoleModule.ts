import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { AccountRoleRepository } from '@/domain/permission/accountrole/persistence/AccountRoleRepository';
import { AccountRoleService } from '@/domain/permission/accountrole/domain/AccountRoleService';
import { AccountRoleDummyBuilder } from '@/domain/permission/accountrole/dev/AccountRoleDummyBuilder';
import { AccountRoleController } from '@/domain/permission/accountrole/web/AccountRoleController';
import { RoleModule } from '@/domain/permission/role/RoleModule';

@Module({
  controllers: [AccountRoleController],
  providers: [
    PrismaService,
    AccountRoleRepository,
    AccountRoleService,
    AccountRoleDummyBuilder,
  ],
  imports: [RoleModule],
  exports: [AccountRoleService],
})
export class AccountRoleModule {}
