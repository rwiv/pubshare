import { SetMetadata } from '@nestjs/common';
import { AccountType } from '@/domain/account/persistence/accountType';

export const ACCOUNT_TYPE_KEY = 'types';
export const Types = (...types: AccountType[]) =>
  SetMetadata(ACCOUNT_TYPE_KEY, types);
