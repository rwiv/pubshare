import { dbInit } from '@/util/dbInit';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';

describe('PermissionVerifier', () => {
  let ac: AccountDummyBuilder;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, AuthModule],
    }).compile();

    ac = module.get(AccountDummyBuilder);
  });

  it('test', async () => {
    const a1 = await ac.ac(1);
  });
});
