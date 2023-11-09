import { PermissionType } from '@/domain/permission/common/types';
import { Policy } from '@/domain/permission/policy/domain/types';

export interface FilePolicy {
  id: number;
  fileId: number;
  policyId: number;
  permission: PermissionType;
}

export interface FilePolicyResponse {
  id: number;
  fileId: number;
  policy: Policy;
  permission: PermissionType;
}

export interface FilePolicyCreation {
  fileId: number;
  policyId: number;
  permission: PermissionType;
}
