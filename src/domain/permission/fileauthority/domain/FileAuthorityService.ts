import { Injectable } from '@nestjs/common';
import { FileAuthorityRepository } from '@/domain/permission/fileauthority/persistence/FileAuthorityRepository';
import { FileAuthorityCreationPrisma } from '@/domain/permission/fileauthority/persistence/types';
import {
  FileAuthorityCreation,
  FileAuthorityResponse,
} from '@/domain/permission/fileauthority/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { AccountService } from '@/domain/account/domain/AccountService';
import { PermissionType } from '@/domain/permission/common/types';

@Injectable()
export class FileAuthorityService {
  constructor(
    private readonly fileAuthorityRepository: FileAuthorityRepository,
    private readonly accountService: AccountService,
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

  async findByFileId(fileId: number) {
    const fileAuthorities =
      await this.fileAuthorityRepository.findByFileId(fileId);
    const result: FileAuthorityResponse[] = [];
    for (const fileAuthority of fileAuthorities) {
      const account = await this.accountService.findById(
        fileAuthority.accountId,
      );
      result.push({
        id: fileAuthority.id,
        fileId: fileAuthority.fileId,
        account,
        permission: fileAuthority.permission as PermissionType,
      });
    }
    return result;
  }
}
