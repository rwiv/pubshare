import { dbInit } from '@/util/db.init';
import { Test, TestingModule } from '@nestjs/testing';
import { FileCommentService } from '@/domain/file/comment/domain/file.comment.service';
import { FileService } from '@/domain/file/file/domain/file.service';
import { FileModule } from '@/domain/file/file/file.module';
import { FileCommentModule } from '@/domain/file/comment/file.comment.module';
import { AccountModule } from '@/domain/account/account.module';
import { AccountService } from '@/domain/account/domain/account.service';
import { AuthModule } from '@/auth/auth.module';

describe('FileCommentService', () => {
  let fileCommentService: FileCommentService;
  let fileService: FileService;
  let accountService: AccountService;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [FileCommentModule, FileModule, AccountModule, AuthModule],
    }).compile();

    fileCommentService = module.get<FileCommentService>(FileCommentService);
    fileService = module.get<FileService>(FileService);
    accountService = module.get<AccountService>(AccountService);
  });

  it('test', async () => {
    const a1 = await accountService.create({
      email: 'a',
      password: 'a',
      certified: false,
      type: 'MEMBER',
    });

    const f1 = await fileService.create({ path: 'f1' });
    const f2 = await fileService.create({ path: 'f2' });

    const fc1 = await fileCommentService.create({
      content: 'fc1',
      file: { connect: { id: f2.id } },
      createdBy: { connect: { id: a1.id } },
    });

    const fc2 = await fileCommentService.create({
      content: 'fc2',
      file: { connect: { id: f2.id } },
      createdBy: { connect: { id: a1.id } },
      parent: { connect: { id: fc1.id } },
    });

    const fc1r = await fileCommentService.findById(fc1.id);
    console.log(fc1r);
    expect(fc1r.content).toBe('fc1');

    const fc2r = await fileCommentService.findById(fc2.id);
    console.log(fc2r);
  });
});
