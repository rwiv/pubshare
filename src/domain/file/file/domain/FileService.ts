import { Injectable } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/FileRepository';
import { FileCreation } from '@/domain/file/file/persistence/types';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  create(creation: FileCreation) {
    return this.fileRepository.create(creation);
  }

  findById(id: number) {
    return this.fileRepository.findById(id);
  }

  findByPath(path: string) {
    return this.fileRepository.findByPath(path);
  }

  async deleteByPath(path: string) {
    const file = await this.fileRepository.findByPath(path);
    await this.fileRepository.delete(file.id);
    return file;
  }
}
