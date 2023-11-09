import {PermissionType} from "@/client/access/types.ts";
import {Account} from "../../../../src/domain/account/persistence/types";

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

export interface AccountRole {
  id: number;
  accountId: number;
  policyId: number;
}

export interface AccountRoleResponse {
  id: number;
  accountId: number;
  policy: Policy;
}

export interface AccountRoleCreation {
  accountId: number;
  policyId: number;
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
