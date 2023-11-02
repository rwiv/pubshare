import { Injectable } from '@nestjs/common';
import { FileRepository } from '@/domain/file/file/persistence/file.repository';
import { FileModel } from '@/domain/file/file/persistence/prisma';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  findById(id: number): Promise<FileModel> {
    return this.fileRepository.findById(id);
  }

  create(creation: FileCreation): Promise<FileModel> {
    return this.fileRepository.create(creation);
  }
}