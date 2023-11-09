import {PermissionType} from "@/client/access/types.ts";
import {AccountResponse} from "@/client/account/types.ts";

export interface Role {
  id: number;
  name: string;
}

export interface RoleCreation {
  name: string;
}

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

export interface AccountRole {
  id: number;
  accountId: number;
  roleId: number;
}

export interface AccountRoleResponse {
  id: number;
  accountId: number;
  role: Role;
}

export interface AccountRoleCreation {
  accountId: number;
  roleId: number;
}

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
