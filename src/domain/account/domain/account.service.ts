import { Injectable } from '@nestjs/common';
import { AccountCreation, AccountUpdate } from '@/domain/account/domain/types';
import { AccountModel } from '@/domain/account/persistence/prisma';
import { AccountRepository } from '@/domain/account/persistence/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  create(creation: AccountCreation): Promise<AccountModel> {
    return this.accountRepository.create(creation);
  }

  findAll(): Promise<AccountModel[]> {
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

  async certificate(id: number) {
    return this.accountRepository.certificate(id);
  }

  delete(id: number) {
    return this.accountRepository.delete(id);
  }
}
