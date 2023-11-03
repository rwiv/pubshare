import { AccountType } from '@/domain/account/persistence/accountType';

interface AccountResponse {
  id: number;
  email: string;
  certified: boolean;
  type: AccountType;
}

export interface Account {
  id: number;
  email: string;
  password: string;
  certified: boolean;
  type: string;
}

export interface AccountCreation {
  email: string;
  password: string;
  certified: boolean;
  type: AccountType;
}

export interface AccountUpdate {
  email: string;
  password: string;
  certified: boolean;
  type: AccountType;
}
