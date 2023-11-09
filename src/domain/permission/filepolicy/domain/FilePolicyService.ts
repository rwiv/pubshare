import { Injectable } from '@nestjs/common';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyCreationPrisma } from '@/domain/permission/filepolicy/persistence/types';
import {
  FilePolicyCreation,
  FilePolicyResponse,
} from '@/domain/permission/filepolicy/domain/types';
import { toPrismaConnect } from '@/misc/prisma/prismaUtil';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PermissionType } from '@/domain/permission/common/types';

@Injectable()
export class FilePolicyService {
  constructor(
    private readonly filePolicyRepository: FilePolicyRepository,
    private readonly policyService: PolicyService,
  ) {}

  create(creation: FilePolicyCreation) {
    const form: FilePolicyCreationPrisma = {
      file: toPrismaConnect(creation.fileId),
      policy: toPrismaConnect(creation.policyId),
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
      const policy = await this.policyService.findById(filePolicy.policyId);
      result.push({
        id: filePolicy.id,
        fileId: filePolicy.fileId,
        policy,
        permission: filePolicy.permission as PermissionType,
      });
    }
    return result;
  }
}
