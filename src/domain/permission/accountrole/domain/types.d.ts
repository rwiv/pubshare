import { Policy } from '@/domain/permission/policy/domain/types';

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
