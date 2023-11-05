import { dbInit } from '@/util/dbInit';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@/domain/file/file/domain/FileService';
import { FileModule } from '@/domain/file/file/FileModule';
import { permissionTypeValues } from '@/domain/permission/common/types';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [FileModule],
    }).compile();

    fileService = module.get(FileService);
  });

  it('test', async () => {
    const a1 = await fileService.create({
      path: 'hello/world',
      memberDefaultPerm: permissionTypeValues.WRITE,
      guestDefaultPerm: permissionTypeValues.WRITE,
    });
    const result = await fileService.findById(a1.id);
    expect(result.path).toBe('hello/world');

    const result2 = await fileService.findById(100);
    expect(result2).toBe(null);
  });
});
