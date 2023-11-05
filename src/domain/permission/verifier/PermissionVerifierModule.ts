import { Module } from '@nestjs/common';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { FilePolicyModule } from '@/domain/permission/filepolicy/FilePolicyModule';
import { FileAuthorityModule } from '@/domain/permission/fileauthority/FileAuthorityModule';
import { RoleModule } from '@/domain/permission/role/RoleModule';

@Module({
  providers: [PermissionVerifier],
  imports: [FilePolicyModule, FileAuthorityModule, RoleModule],
  exports: [PermissionVerifier],
})
export class PermissionVerifierModule {}
