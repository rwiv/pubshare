import { Injectable } from '@nestjs/common';
import { FileRoleRepository } from '@/domain/permission/filerole/persistence/FileRoleRepository';
import { FileRoleCreationPrisma } from '@/domain/permission/filerole/persistence/types';
import {
  FileRoleCreation,
  FileRoleResponse,
} from '@/domain/permission/filerole/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { PermissionType } from '@/domain/permission/common/types';
import { PermissionException } from '@/domain/permission/common/PermissionException';

@Injectable()
export class FileRoleService {
  constructor(
    private readonly fileRoleRepository: FileRoleRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(creation: FileRoleCreation) {
    const exists = await this.fileRoleRepository.findByFileId(creation.fileId);
    const match = exists.filter((fileRole) => fileRole.roleId === creation.roleId);
    if (match.length > 0) {
      throw new PermissionException('duplicate roles cannot be registered in one file');
    }

    const form: FileRoleCreationPrisma = {
      file: toPrismaConnect(creation.fileId),
      role: toPrismaConnect(creation.roleId),
      permission: creation.permission,
    };
    return this.fileRoleRepository.create(form);
  }

  findById(id: number) {
    return this.fileRoleRepository.findById(id);
  }

  async findByFileId(fileId: number) {
    const fileRoles = await this.fileRoleRepository.findByFileId(fileId);
    const result: FileRoleResponse[] = [];
    for (const fileRole of fileRoles) {
      const role = await this.roleService.findById(fileRole.roleId);
      result.push({
        id: fileRole.id,
        fileId: fileRole.fileId,
        role,
        permission: fileRole.permission as PermissionType,
      });
    }
    return result;
  }
}
