import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@/domain/account/domain/AccountService';
import { dbInit } from '@/util/dbInit';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';

describe('AccountService', () => {
  let accountService: AccountService;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, AuthModule],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
  });

  it('test', async () => {
    const a1 = await accountService.create({
      email: 'a',
      password: 'a',
      certified: false,
      type: 'MEMBER',
    });
    const result = await accountService.findById(a1.id);
    console.log(result);
    expect(result.email).toBe('a');
  });
});
