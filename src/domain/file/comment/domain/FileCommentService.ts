import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { Injectable } from '@nestjs/common';
import { FileCommentCreationPrisma } from '@/domain/file/comment/persistence/types';
import { FileCommentCreation } from '@/domain/file/comment/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';

@Injectable()
export class FileCommentService {
  constructor(private readonly fileCommentRepository: FileCommentRepository) {}

  create(creation: FileCommentCreation) {
    const form: FileCommentCreationPrisma = {
      content: creation.content,
      file: toPrismaConnect(creation.fileId),
      createdBy: toPrismaConnect(creation.createdById),
      parent: toPrismaConnect(creation.parentId),
    };
    return this.fileCommentRepository.create(form);
  }

  findById(id: number) {
    return this.fileCommentRepository.findById(id);
  }

  findByFileId(fileId: number) {
    return this.fileCommentRepository.findByFileId(fileId);
  }
}
