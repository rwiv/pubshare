import { PermissionType } from '@/domain/permission/common/types';
import { AccountResponse } from '@/domain/account/web/types';

export interface FileAuthority {
  id: number;
  fileId: number;
  accountId: number;
  permission: PermissionType;
}

export interface FileAuthorityResponse {
  id: number;
  fileId: number;
  account: AccountResponse;
  permission: PermissionType;
}

export interface FileAuthorityCreation {
  fileId: number;
  accountId: number;
  permission: PermissionType;
}
