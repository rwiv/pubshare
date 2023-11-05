import { Test, TestingModule } from '@nestjs/testing';
import { dbInit } from '@/util/dbInit';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';
import { AccessModule } from '@/domain/access/AccessModule';
import { AccessService } from '@/domain/access/domain/AccessService';
import { accountTypeValues } from '@/domain/account/persistence/accountType';

describe('AccessService', () => {
  let accessService: AccessService;
  let ac: AccountDummyBuilder;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, AuthModule, AccessModule],
    }).compile();

    accessService = module.get(AccessService);
    ac = module.get(AccountDummyBuilder);
  });

  it('test', async () => {
    const a1 = await ac.ac(1);
    const auth1 = ac.sc(a1);

    const files1 = await accessService.list(auth1, 'hello/');
    console.log(files1);

    const a2 = await ac.ac(2, accountTypeValues.MEMBER);
    const auth2 = ac.sc(a2);
    const files2 = await accessService.list(auth2, '');
    console.log(files2);
  });
});
