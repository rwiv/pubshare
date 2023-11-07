import { PermissionType } from '@/domain/permission/common/types';

export interface FileAuthorityCreation {
  fileId: number;
  accountId: number;
  permission: PermissionType;
}
