import { Injectable } from '@nestjs/common';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/persistence/types';
import {
  PermissionType,
  permissionTypeValues,
} from '@/domain/permission/common/types';

@Injectable()
export class FileAuthorityDummyBuilder {
  constructor(private readonly fileAuthorityService: FileAuthorityService) {}

  fa(
    fileId: number,
    accountId: number,
    permission: PermissionType = permissionTypeValues.WRITE,
  ) {
    const creation: FileAuthorityCreation = {
      file: { connect: { id: fileId } },
      account: { connect: { id: accountId } },
      permission,
    };
    return this.fileAuthorityService.create(creation);
  }
}
