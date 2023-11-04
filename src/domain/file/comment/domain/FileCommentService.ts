import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { Injectable } from '@nestjs/common';
import { FileCommentCreation } from '@/domain/file/comment/persistence/types';

@Injectable()
export class FileCommentService {
  constructor(private readonly fileCommentRepository: FileCommentRepository) {}

  create(creation: FileCommentCreation) {
    return this.fileCommentRepository.create(creation);
  }

  findById(id: number) {
    return this.fileCommentRepository.findById(id);
  }

  findByFileId(fileId: number) {
    return this.fileCommentRepository.findByFileId(fileId);
  }
}
