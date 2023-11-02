import { FileCommentRepository } from '@/domain/file/comment/persistence/file.comment.repository';
import { Injectable } from '@nestjs/common';
import { FileCommentModel } from '@/domain/file/comment/persistence/prisma';
import { FileCommentCreation } from '@/domain/file/comment/domain/types';

@Injectable()
export class FileCommentService {
  constructor(private readonly fileCommentRepository: FileCommentRepository) {}

  findById(id: number): Promise<FileCommentModel> {
    return this.fileCommentRepository.findById(id);
  }

  create(creation: FileCommentCreation): Promise<FileCommentModel> {
    return this.fileCommentRepository.create(creation);
  }
}
