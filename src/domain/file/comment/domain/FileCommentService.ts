import { FileCommentRepository } from '@/domain/file/comment/persistence/FileCommentRepository';
import { Injectable } from '@nestjs/common';
import { FileCommentCreationPrisma } from '@/domain/file/comment/persistence/types';
import {
  FileCommentCreation,
  FileCommentResponse,
} from '@/domain/file/comment/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { AccountService } from '@/domain/account/domain/AccountService';

@Injectable()
export class FileCommentService {
  constructor(
    private readonly fileCommentRepository: FileCommentRepository,
    private readonly accountService: AccountService,
  ) {}

  create(creation: FileCommentCreation) {
    const form: FileCommentCreationPrisma = {
      content: creation.content,
      file: toPrismaConnect(creation.fileId),
      createdBy: toPrismaConnect(creation.createdById),
    };
    return this.fileCommentRepository.create(form);
  }

  findById(id: number) {
    return this.fileCommentRepository.findById(id);
  }

  async findByFileId(fileId: number): Promise<FileCommentResponse[]> {
    const fileComments = await this.fileCommentRepository.findByFileId(fileId);
    const result: FileCommentResponse[] = [];
    for (const fileComment of fileComments) {
      const account = await this.accountService.findById(fileComment.createdById);
      result.push({
        id: fileComment.id,
        fileId: fileComment.fileId,
        createdBy: this.accountService.convertResponse(account),
        content: fileComment.content,
      });
    }
    return result;
  }

  delete(id: number) {
    return this.fileCommentRepository.delete(id);
  }
}
