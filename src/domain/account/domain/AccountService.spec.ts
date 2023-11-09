import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@/domain/account/domain/AccountService';
import { dbInit } from '@/util/dbInit';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';

describe('AccountService', () => {
  let accountService: AccountService;
  let ac: AccountDummyBuilder;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, AuthModule],
    }).compile();

    accountService = module.get(AccountService);
    ac = module.get(AccountDummyBuilder);
  });

  it('test', async () => {
    const a1 = await ac.ac(1);
    const result = await accountService.findById(a1.id);
    console.log(result);
    expect(result.username).toBe('1');
  });
});
