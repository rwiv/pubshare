export interface Role {
  id: number;
  accountId: number;
  policyId: number;
}

export interface RoleCreation {
  accountId: number;
  policyId: number;
}
