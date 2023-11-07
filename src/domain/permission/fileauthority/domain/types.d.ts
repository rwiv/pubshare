import { PermissionType } from '@/domain/permission/common/types';

export interface FilAuthority {
  id: number;
  fileId: number;
  accountId: number;
  permission: PermissionType;
}

export interface FileAuthorityCreation {
  fileId: number;
  accountId: number;
  permission: PermissionType;
}
