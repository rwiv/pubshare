import { PermissionType } from '@/domain/permission/common/types';

export interface FilePolicyCreation {
  fileId: number;
  policyId: number;
  permission: PermissionType;
}
