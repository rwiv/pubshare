import { Injectable } from '@nestjs/common';
import {
  Account,
  AccountCreation,
  AccountUpdate,
} from '@/domain/account/persistence/types';
import { AccountRepository } from '@/domain/account/persistence/AccountRepository';
import {AccountResponse} from "@/domain/account/web/types";
import {AccountType} from "@/domain/account/persistence/accountType";

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  convertResponse(account: Account): AccountResponse {
    const { id, username, nickname, certified, type } = account;
    return { id, username, certified, nickname, type: type as AccountType };
  }

  create(creation: AccountCreation) {
    return this.accountRepository.create(creation);
  }

  findAll() {
    return this.accountRepository.findAll();
  }

  findById(id: number) {
    return this.accountRepository.findById(id);
  }

  findByUsername(username: string) {
    return this.accountRepository.findByUsername(username);
  }

  update(id: number, update: AccountUpdate) {
    return this.accountRepository.update(id, update);
  }

  certificate(id: number) {
    return this.accountRepository.certificate(id);
  }

  delete(id: number) {
    return this.accountRepository.delete(id);
  }
}
