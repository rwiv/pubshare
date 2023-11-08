import {PermissionType} from "@/client/access/types.ts";

export interface Policy {
  id: number;
  name: string;
}

export interface PolicyCreation {
  name: string;
}

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

export interface Role {
  id: number;
  accountId: number;
  policyId: number;
}

export interface RoleCreation {
  accountId: number;
  policyId: number;
}

export interface FileAuthority {
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
