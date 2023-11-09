import { AccountType } from '@/domain/account/persistence/accountType';

export interface Account {
  id: number;
  username: string;
  password: string;
  nickname: string;
  certified: boolean;
  type: string;
}

export interface AccountCreation {
  username: string;
  password: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}

export interface AccountUpdate {
  username: string;
  password: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}
