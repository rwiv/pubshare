import { PermissionType } from '@/domain/permission/common/types';
import { Role } from '@/domain/permission/role/domain/types';

export interface FilePolicy {
  id: number;
  fileId: number;
  roleId: number;
  permission: PermissionType;
}

export interface FilePolicyResponse {
  id: number;
  fileId: number;
  role: Role;
  permission: PermissionType;
}

export interface FilePolicyCreation {
  fileId: number;
  roleId: number;
  permission: PermissionType;
}
