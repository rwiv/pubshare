import { Injectable } from '@nestjs/common';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyCreationPrisma } from '@/domain/permission/filepolicy/persistence/types';
import {FilePolicyCreation} from "@/domain/permission/filepolicy/domain/types";
import {PrismaConnect} from "@/misc/prisma/prisma.types";
import {PermissionType} from "@/domain/permission/common/types";
import {toPrismaConnect} from "@/misc/prisma/prismaUtil";

@Injectable()
export class FilePolicyService {
  constructor(private readonly filePolicyRepository: FilePolicyRepository) {}

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

  findByFileId(fileId: number) {
    return this.filePolicyRepository.findByFileId(fileId);
  }
}
