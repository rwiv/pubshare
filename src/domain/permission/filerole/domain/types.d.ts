import { PermissionType } from '@/domain/permission/common/types';
import { Role } from '@/domain/permission/role/domain/types';

export interface FileRole {
  id: number;
  fileId: number;
  roleId: number;
  permission: PermissionType;
}

export interface FileRoleResponse {
  id: number;
  fileId: number;
  role: Role;
  permission: PermissionType;
}

export interface FileRoleCreation {
  fileId: number;
  roleId: number;
  permission: PermissionType;
}
