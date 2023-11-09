import { Role } from '@/domain/permission/role/domain/types';

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
