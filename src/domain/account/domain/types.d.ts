import { AccountRole } from '@/domain/account/persistence/account.role';

interface AccountResponse {
  id: number;
  email: string;
  certified: boolean;
  role: AccountRole;
}

export interface Account {
  id: number;
  email: string;
  password: string;
  certified: boolean;
  role: string;
}

export interface AccountCreation {
  email: string;
  password: string;
  certified: boolean;
  role: AccountRole;
}

export interface AccountUpdate {
  email: string;
  password: string;
  certified: boolean;
  role: AccountRole;
}
