import { dbInit } from '@/util/db.init';
import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '@/domain/file/file/domain/file.service';
import { FileModule } from '@/domain/file/file/file.module';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    dbInit();

    const module: TestingModule = await Test.createTestingModule({
      imports: [FileModule],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  it('test', async () => {
    const a1 = await fileService.create({
      path: 'hello/world',
    });
    const result = await fileService.findById(a1.id);
    console.log(result);
    expect(result.path).toBe('hello/world');
  });
});
