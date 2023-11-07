import { Injectable } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { FileAuthorityCreationPrisma } from '@/domain/permission/fileauthority/persistence/types';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';

@Injectable()
export class FileAuthorityService {
  constructor(
    private readonly fileAuthorityRepository: FileAuthorityRepository,
  ) {}

  create(creation: FileAuthorityCreation) {
    // TODO: 같은 account 중복 금지 로직 추가
    const form: FileAuthorityCreationPrisma = {
      file: toPrismaConnect(creation.fileId),
      account: toPrismaConnect(creation.accountId),
      permission: creation.permission,
    };
    return this.fileAuthorityRepository.create(form);
  }

  findById(id: number) {
    return this.fileAuthorityRepository.findById(id);
  }

  findByFileId(fileId: number) {
    return this.fileAuthorityRepository.findByFileId(fileId);
  }
}
