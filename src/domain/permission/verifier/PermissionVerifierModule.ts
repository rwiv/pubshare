import { Module } from '@nestjs/common';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { FilePolicyModule } from '@/domain/permission/filepolicy/FilePolicyModule';
import { FileAuthorityModule } from '@/domain/permission/fileauthority/FileAuthorityModule';
import { AccountRoleModule } from '@/domain/permission/accountrole/AccountRoleModule';

@Module({
  providers: [PermissionVerifier],
  imports: [FilePolicyModule, FileAuthorityModule, AccountRoleModule],
  exports: [PermissionVerifier],
})
export class PermissionVerifierModule {}
