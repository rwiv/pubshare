import { Injectable } from '@nestjs/common';
import { FilePolicyRepository } from '@/domain/permission/filepolicy/persistence/FilePolicyRepository';
import { FilePolicyCreation } from '@/domain/permission/filepolicy/persistence/types';

@Injectable()
export class FilePolicyService {
  constructor(private readonly filePolicyRepository: FilePolicyRepository) {}

  create(creation: FilePolicyCreation) {
    return this.filePolicyRepository.create(creation);
  }

  findById(id: number) {
    return this.filePolicyRepository.findById(id);
  }
}
