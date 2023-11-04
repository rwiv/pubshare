import { Module } from '@nestjs/common';
import { DevModule } from '@/domain/dev/DevModule';
import { AccessModule } from '@/domain/access/AccessModule';
import { AuthModule } from '@/auth/AuthModule';
import { AccountModule } from '@/domain/account/AccountModule';
import { FileModule } from '@/domain/file/file/FileModule';
import { FileCommentModule } from '@/domain/file/comment/FileCommentModule';
import { TagModule } from '@/domain/file/tag/TagModule';
import { PolicyModule } from '@/domain/permission/policy/PolicyModule';
import { RoleModule } from '@/domain/permission/role/RoleModule';
import { FilePolicyModule } from '@/domain/permission/filepolicy/FilePolicyModule';
import { FileAuthorityModule } from '@/domain/permission/fileauthority/FileAuthorityModule';
import {PermissionVerifierModule} from "@/domain/permission/verifier/PermissionVerifierModule";

@Module({
  imports: [
    AccountModule,
    DevModule,
    AccessModule,
    AuthModule,
    FileModule,
    FileCommentModule,
    TagModule,
    PolicyModule,
    FilePolicyModule,
    FileAuthorityModule,
    RoleModule,
    PermissionVerifierModule,
  ],
})
export class AppModule {}
