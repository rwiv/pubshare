import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { AccountRoleRepository } from '@/domain/permission/accountrole/persistence/AccountRoleRepository';
import { AccountRoleService } from '@/domain/permission/accountrole/domain/AccountRoleService';
import { AccountRoleDummyBuilder } from '@/domain/permission/accountrole/dev/AccountRoleDummyBuilder';
import { AccountRoleController } from '@/domain/permission/accountrole/web/AccountRoleController';
import { PolicyModule } from '@/domain/permission/policy/PolicyModule';

@Module({
  controllers: [AccountRoleController],
  providers: [
    PrismaService,
    AccountRoleRepository,
    AccountRoleService,
    AccountRoleDummyBuilder,
  ],
  imports: [PolicyModule],
  exports: [AccountRoleService],
})
export class AccountRoleModule {}
