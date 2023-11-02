import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@/domain/account/domain/account.service';
import { PrismaService } from '@/misc/prisma.service';
import { dbInit } from '@/util/db.init';
import { AccountRepository } from '@/domain/account/persistence/account.repository';

describe('account domain', () => {
  let service: AccountService;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRepository, AccountService, PrismaService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('test', async () => {
    const a1 = await service.create({
      email: 'a',
      password: 'a',
      certified: false,
      role: 'MEMBER',
    });
    const result = await service.findById(a1.id);
    console.log(result);
    expect(result.email).toBe('a');
  });
});
