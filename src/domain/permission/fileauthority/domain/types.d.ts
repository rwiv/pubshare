import { PermissionType } from '@/domain/permission/common/types';
import { Account } from '@/domain/account/persistence/types';

export interface FileAuthority {
  id: number;
  fileId: number;
  accountId: number;
  permission: PermissionType;
}

export interface FileAuthorityResponse {
  id: number;
  fileId: number;
  account: Account;
  permission: PermissionType;
}

export interface FileAuthorityCreation {
  fileId: number;
  accountId: number;
  permission: PermissionType;
}
