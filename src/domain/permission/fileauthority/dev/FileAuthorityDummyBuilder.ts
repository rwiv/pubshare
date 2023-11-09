import { Injectable } from '@nestjs/common';
import { FileAuthorityService } from '@/domain/permission/fileauthority/domain/FileAuthorityService';
import {
  PermissionType,
  permissionTypes,
} from '@/domain/permission/common/types';
import { FileAuthorityCreation } from '@/domain/permission/fileauthority/domain/types';

@Injectable()
export class FileAuthorityDummyBuilder {
  constructor(private readonly fileAuthorityService: FileAuthorityService) {}

  fa(
    fileId: number,
    accountId: number,
    permission: PermissionType = permissionTypes.WRITE,
  ) {
    const creation: FileAuthorityCreation = { fileId, accountId, permission };
    return this.fileAuthorityService.create(creation);
  }
}
