import { Injectable } from '@nestjs/common';
import { FileRoleService } from '@/domain/permission/filerole/domain/FileRoleService';
import {
  PermissionType,
  permissionTypes,
} from '@/domain/permission/common/types';
import { FileRoleCreation } from '@/domain/permission/filerole/domain/types';

@Injectable()
export class FileRoleDummyBuilder {
  constructor(private readonly fileRoleService: FileRoleService) {}

  fp(
    fileId: number,
    roleId: number,
    permission: PermissionType = permissionTypes.WRITE,
  ) {
    const creation: FileRoleCreation = { fileId, roleId, permission };
    return this.fileRoleService.create(creation);
  }
}
