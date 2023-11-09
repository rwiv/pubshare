import { Module } from '@nestjs/common';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { FileRoleModule } from '@/domain/permission/filerole/FileRoleModule';
import { FileAuthorityModule } from '@/domain/permission/fileauthority/FileAuthorityModule';
import { AccountRoleModule } from '@/domain/permission/accountrole/AccountRoleModule';

@Module({
  providers: [PermissionVerifier],
  imports: [FileRoleModule, FileAuthorityModule, AccountRoleModule],
  exports: [PermissionVerifier],
})
export class PermissionVerifierModule {}
