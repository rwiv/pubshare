import { AccountType } from '@/domain/account/persistence/accountType';

interface AccountResponse {
  id: number;
  email: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}
