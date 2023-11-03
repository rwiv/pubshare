import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { Injectable } from '@nestjs/common';
import { FileCommentCreation } from '@/domain/file/comment/domain/types';

@Injectable()
export class FileCommentService {
  constructor(private readonly fileCommentRepository: FileCommentRepository) {}

  findById(id: number) {
    return this.fileCommentRepository.findById(id);
  }

  create(creation: FileCommentCreation) {
    return this.fileCommentRepository.create(creation);
  }
}
