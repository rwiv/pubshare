import { dbInit } from '@/util/dbInit';
import { Test, TestingModule } from '@nestjs/testing';
import { FileCommentService } from '@/domain/file/comment/domain/FileCommentService';
import { FileModule } from '@/domain/file/file/FileModule';
import { FileCommentModule } from '@/domain/file/comment/FileCommentModule';
import { AccountModule } from '@/domain/account/AccountModule';
import { AuthModule } from '@/auth/AuthModule';
import { AccountDummyBuilder } from '@/domain/account/dev/AccountDummyBuilder';
import { FileDummyBuilder } from '@/domain/file/file/dev/FileDummyBuilder';

describe('FileCommentService', () => {
  let fileCommentService: FileCommentService;
  let ac: AccountDummyBuilder;
  let fi: FileDummyBuilder;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [FileCommentModule, FileModule, AccountModule, AuthModule],
    }).compile();

    fileCommentService = module.get(FileCommentService);
    ac = module.get(AccountDummyBuilder);
    fi = module.get(FileDummyBuilder);
  });

  it('test', async () => {
    const a1 = await ac.ac(1);

    const f1 = await fi.fi(1);
    const f2 = await fi.fi(2);

    const fc1 = await fileCommentService.create({
      content: 'fc1',
      fileId: f2.id,
      createdById: a1.id,
    });

    const fc2 = await fileCommentService.create({
      content: 'fc2',
      fileId: f2.id,
      createdById: a1.id,
    });

    const fc1r = await fileCommentService.findById(fc1.id);
    console.log(fc1r);
    expect(fc1r.content).toBe('fc1');

    const fc2r = await fileCommentService.findById(fc2.id);
    console.log(fc2r);
  });
});
