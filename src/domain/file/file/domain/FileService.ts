import { Injectable } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/FileRepository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  findById(id: number) {
    return this.fileRepository.findById(id);
  }

  create(creation: FileCreation) {
    return this.fileRepository.create(creation);
  }
}