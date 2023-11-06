import { Injectable } from '@nestjs/common';
import { accountTypeValues } from '@/domain/account/persistence/accountType';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { AuthToken } from '@/auth/authentication/types';
import {
  permToPriority,
  priorityToPerm,
  PermissionType,
  permissionTypeValues,
} from '@/domain/permission/common/types';
import { filterMap, find } from '@/util/iter';
import { File } from '@/domain/file/file/persistence/types';

@Injectable()
export class PermissionVerifier {
  constructor(
    private readonly filePolicyService: FilePolicyService,
    private readonly fileAuthorityService: FileAuthorityService,
    private readonly roleService: RoleService,
  ) {}

  async verify(auth: AuthToken | null, file: File) {
    // account is guest
    if (auth === null) {
      return file.guestDefaultPerm;
    }

    if (auth.type === accountTypeValues.ADMIN) {
      return permissionTypeValues.WRITE;
    }

    let perm = await this.checkPolicy(auth, file.id);
    const authorityPerm = await this.checkAuthority(auth, file.id);
    if (authorityPerm !== null) {
      if (perm === null) {
        perm = authorityPerm;
      } else if (permToPriority(perm) < permToPriority(authorityPerm)) {
        perm = authorityPerm;
      }
    }

    if (perm !== null) {
      return perm;
    } else {
      return file.memberDefaultPerm;
    }
  }

  private async checkPolicy(
    auth: AuthToken,
    fileId: number,
  ): Promise<PermissionType | null> {
    const roles = await this.roleService.findByAccountId(auth.id);

    const filePolicies = await this.filePolicyService.findByFileId(fileId);
    const filePolicyMap = new Map<number, string>();
    filePolicies.forEach((fp) => {
      filePolicyMap.set(fp.policyId, fp.permission);
    });

    const matches = filterMap(roles, (role) => {
      const rolePerm = filePolicyMap.get(role.policyId);
      const ok = rolePerm !== undefined;
      const res = permToPriority(rolePerm);
      return { ok, res };
    });

    if (matches.length === 0) {
      return null;
    } else {
      return priorityToPerm(Math.max(...matches));
    }
  }

  private async checkAuthority(
    auth: AuthToken,
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
