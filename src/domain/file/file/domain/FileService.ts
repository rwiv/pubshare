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
}
