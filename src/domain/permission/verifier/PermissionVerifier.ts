import { Injectable } from '@nestjs/common';
import { AccountTypeValues } from '@/domain/account/persistence/accountType';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { SecurityContext } from '@/auth/authentication/types';
import {
  permToPriority,
  priorityToPerm,
  PermissionType,
  permissionTypeValues,
} from '@/domain/permission/common/types';
import { find } from '@/util/iter';
import { FileService } from '@/domain/file/file/domain/FileService';

@Injectable()
export class PermissionVerifier {
  constructor(
    private readonly filePolicyService: FilePolicyService,
    private readonly fileAuthorityService: FileAuthorityService,
    private readonly roleService: RoleService,
    private readonly fileService: FileService,
  ) {}

  async verify(auth: SecurityContext | null, fileId: number) {
    const file = await this.fileService.findById(fileId);

    // account is guest
    if (auth === null) {
      return file.guestDefaultPerm;
    }

    if (auth.type === AccountTypeValues.ADMIN) {
      return permissionTypeValues.WRITE;
    }

    let perm: PermissionType = null;

    perm = await this.checkPolicy(auth, fileId);
    if (perm !== null) {
      return perm;
    }

    perm = await this.checkAuthority(auth, fileId);
    if (perm !== null) {
      return perm;
    }

    return file.memberDefaultPerm;
  }

  private async checkPolicy(
    auth: SecurityContext,
    fileId: number,
  ): Promise<PermissionType | null> {
    const roles = await this.roleService.findByAccountId(auth.id);

    const filePolicies = await this.filePolicyService.findByFileId(fileId);
    const fpMap = new Map<number, string>();
    filePolicies.forEach((fp) => {
      fpMap.set(fp.id, fp.permission);
    });

    const matches = roles
      .filter((role) => fpMap.get(role.policyId) !== undefined)
      .map((role) => fpMap.get(role.policyId))
      .map((permissionType) => permToPriority(permissionType));

    return priorityToPerm(Math.max(...matches));
  }

  private async checkAuthority(
    auth: SecurityContext,
    fileId: number,
  ): Promise<PermissionType | null> {
    const authorities = await this.fileAuthorityService.findByFileId(fileId);
    const match = find(
      authorities,
      (authority) => authority.accountId === auth.id,
    );

    if (match === null) {
      return null;
    } else {
      return match.permission as PermissionType;
    }
  }
}
