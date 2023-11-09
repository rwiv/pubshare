import { Policy } from '@/domain/permission/policy/domain/types';

export interface Role {
  id: number;
  accountId: number;
  policyId: number;
}

export interface RoleResponse {
  id: number;
  accountId: number;
  policy: Policy;
}

export interface RoleCreation {
  accountId: number;
  policyId: number;
}
