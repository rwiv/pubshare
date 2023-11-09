import { Injectable } from '@nestjs/common';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyCreationPrisma } from '@/domain/permission/filepolicy/persistence/types';
import {
  FilePolicyCreation,
  FilePolicyResponse,
} from '@/domain/permission/filepolicy/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { PermissionType } from '@/domain/permission/common/types';
import { PermissionException } from '@/domain/permission/common/PermissionException';

@Injectable()
export class FilePolicyService {
  constructor(
    private readonly filePolicyRepository: FilePolicyRepository,
    private readonly policyService: RoleService,
  ) {}

  async create(creation: FilePolicyCreation) {
    const exists = await this.filePolicyRepository.findByFileId(creation.fileId);
    const match = exists.filter((filePolicy) => filePolicy.roleId === creation.roleId);
    if (match.length > 0) {
      throw new PermissionException('duplicate policies cannot be registered in one file');
    }

    const form: FilePolicyCreationPrisma = {
      file: toPrismaConnect(creation.fileId),
      role: toPrismaConnect(creation.roleId),
      permission: creation.permission,
    };
    return this.filePolicyRepository.create(form);
  }

  findById(id: number) {
    return this.filePolicyRepository.findById(id);
  }

  async findByFileId(fileId: number) {
    const filePolicies = await this.filePolicyRepository.findByFileId(fileId);
    const result: FilePolicyResponse[] = [];
    for (const filePolicy of filePolicies) {
      const policy = await this.policyService.findById(filePolicy.roleId);
      result.push({
        id: filePolicy.id,
        fileId: filePolicy.fileId,
        role: policy,
        permission: filePolicy.permission as PermissionType,
      });
    }
    return result;
  }
}
