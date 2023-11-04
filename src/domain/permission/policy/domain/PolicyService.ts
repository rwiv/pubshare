import { Injectable } from '@nestjs/common';
import { PolicyRepository } from '@/domain/permission/policy/persistence/PolicyRepository';
import { PolicyCreation } from '@/domain/permission/policy/persistence/types';

@Injectable()
export class PolicyService {
  constructor(private readonly policyRepository: PolicyRepository) {}

  create(creation: PolicyCreation) {
    return this.policyRepository.create(creation);
  }

  findById(id: number) {
    return this.policyRepository.findById(id);
  }
}
