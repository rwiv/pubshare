import { Injectable } from '@nestjs/common';
import { accountTypeValues } from '@/domain/account/persistence/accountType';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FileRoleService } from '@/domain/permission/filerole/domain/FileRoleService';
import { AccountRoleService } from '@/domain/permission/accountrole/domain/AccountRoleService';
import { AuthToken } from '@/auth/authentication/types';
import {
  permToPriority,
  priorityToPerm,
  PermissionType,
  permissionTypeValues,
} from '@/domain/permission/common/types';
import { filterMap, find } from '@/util/iter';
import { File } from '@/domain/file/file/persistence/types';
import { AccountService } from '@/domain/account/domain/AccountService';
import { Account } from '@/domain/account/persistence/types';

@Injectable()
export class PermissionVerifier {
  constructor(
    private readonly fileRoleService: FileRoleService,
    private readonly fileAuthorityService: FileAuthorityService,
    private readonly accountRoleService: AccountRoleService,
    private readonly accountService: AccountService,
  ) {}

  async verify(auth: AuthToken, file: File) {
    const account = await this.accountService.findByUsername(auth.username);

    // account is guest
    if (account.type === accountTypeValues.GUEST) {
      return file.guestDefaultPerm;
    } else if (auth.type === accountTypeValues.ADMIN) {
      return permissionTypeValues.WRITE;
    }

    let perm = await this.checkRole(account, file.id);
    const authorityPerm = await this.checkAuthority(account, file.id);
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

  private async checkRole(account: Account, fileId: number): Promise<PermissionType | null> {
    const accountRoles = await this.accountRoleService.findByAccountId(account.id);

    const fileRoles = await this.fileRoleService.findByFileId(fileId);
    const fileRoleMap = new Map<number, string>();
    fileRoles.forEach((fileRole) => {
      fileRoleMap.set(fileRole.role.id, fileRole.permission);
    });

    const matches = filterMap(accountRoles, (accountRole) => {
      const rolePerm = fileRoleMap.get(accountRole.role.id);
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

  private async checkAuthority(account: Account, fileId: number): Promise<PermissionType | null> {
    const authorities = await this.fileAuthorityService.findByFileId(fileId);
    const match = find(
      authorities,
      (authority) => authority.account.id === account.id,
    );

    if (match === null) {
      return null;
    } else {
      return match.permission as PermissionType;
    }
  }
}
