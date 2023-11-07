import { Injectable } from '@nestjs/common';
import { FilePolicyService } from '@/domain/permission/filepolicy/domain/FilePolicyService';
import {
  PermissionType,
  permissionTypeValues,
} from '@/domain/permission/common/types';
import { FilePolicyCreation } from '@/domain/permission/filepolicy/domain/types';

@Injectable()
export class FilePolicyDummyBuilder {
  constructor(private readonly filePolicyService: FilePolicyService) {}

  fp(
    fileId: number,
    policyId: number,
    permission: PermissionType = permissionTypeValues.WRITE,
  ) {
    const creation: FilePolicyCreation = { fileId, policyId, permission };
    return this.filePolicyService.create(creation);
  }
}
