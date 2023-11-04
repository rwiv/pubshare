import { Injectable } from '@nestjs/common';
import { AccountService } from '@/domain/account/domain/AccountService';
import {Account, AccountCreation} from '@/domain/account/persistence/types';
import {
  AccountType,
  accountTypeValues,
} from '@/domain/account/persistence/accountType';
import {SecurityContext} from "@/auth/authentication/types";

@Injectable()
export class AccountDummyBuilder {
  constructor(private readonly accountService: AccountService) {}

  sc(account: Account): SecurityContext {
    return {
      id: account.id,
      email: account.email,
      certified: account.certified,
      type: account.type,
    };
  }

  ac(
    n: number,
    type: AccountType = accountTypeValues.ADMIN,
    certified: boolean = true,
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
