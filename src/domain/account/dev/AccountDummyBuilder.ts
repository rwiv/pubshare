import { Injectable } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import { Account, AccountCreation } from '@/domain/account/persistence/types';
import {
  AccountType,
  accountTypeValues,
} from '@/domain/account/persistence/accountType';
import { AuthToken } from '@/auth/authentication/types';

@Injectable()
export class AccountDummyBuilder {
  constructor(private readonly accountService: AccountService) {}

  sc(account: Account): AuthToken {
    return {
      username: account.username,
      type: account.type,
    };
  }

  acDt1(
    s: string,
    type: AccountType = accountTypeValues.ADMIN,
    certified: boolean = true,
  ) {
    return this.accountService.create(this.acC(s, type, certified));
  }

  acDt2(
    keyword: string,
    password: string,
    type: AccountType = accountTypeValues.ADMIN,
    certified: boolean = true,
  ) {
    const creation = {
      username: `${keyword}@gmail.com`,
      password: password,
      nickname: keyword,
      certified,
      type,
    };
    return this.accountService.create(creation);
  }

  ac(
    n: number,
    type: AccountType = accountTypeValues.ADMIN,
    certified: boolean = true,
  ) {
    return this.accountService.create(this.acC(`account${n}`, type, certified));
  }

  acC(str: string, type: AccountType, certified: boolean): AccountCreation {
    return {
      username: str,
      password: str,
      nickname: str,
      certified,
      type,
    };
  }
}
