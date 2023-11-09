import { AccountType } from '@/domain/account/persistence/accountType';

interface AccountResponse {
  id: number;
  username: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}
