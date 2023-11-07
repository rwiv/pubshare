import { PermissionType } from '@/domain/permission/common/types';

export interface FilePolicy {
  id: number;
  fileId: number;
  policyId: number;
  permission: PermissionType;
}

export interface FilePolicyCreation {
  fileId: number;
  policyId: number;
  permission: PermissionType;
}
