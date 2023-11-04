import { Injectable } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import { AccountCreation } from '@/domain/account/persistence/types';
import {
  AccountType,
  AccountTypeValues,
} from '@/domain/account/persistence/accountType';

@Injectable()
export class AccountDummyBuilder {
  constructor(private readonly accountService: AccountService) {}

  ac(
    n: number,
    type: AccountType = AccountTypeValues.ADMIN,
    certified: boolean = false,
  ) {
    return this.accountService.create(this.acC(n, type, certified));
  }

  acC(n: number, type: AccountType, certified: boolean): AccountCreation {
    return {
      email: `${n}`,
      password: `${n}`,
      certified,
      type,
    };
  }
}
