import {PermissionType} from "@/client/access/types.ts";
import {Account} from "../../../../src/domain/account/persistence/types";

export interface Role {
  id: number;
  name: string;
}

export interface RoleCreation {
  name: string;
}

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
  account: Account;
  permission: PermissionType;
}

export interface FileAuthorityCreation {
  fileId: number;
  accountId: number;
  permission: PermissionType;
}
