import { Injectable } from '@nestjs/common';
import { AccountCreation, AccountUpdate } from '@/domain/account/domain/types';
import { AccountRepository } from '@/domain/account/persistence/AccountRepository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

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
