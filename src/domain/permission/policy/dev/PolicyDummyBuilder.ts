import { Injectable } from '@nestjs/common';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PolicyCreation } from '@/domain/permission/policy/persistence/types';

@Injectable()
export class PolicyDummyBuilder {
  constructor(private readonly policyService: PolicyService) {}

  pl(n: number) {
    return this.policyService.create(this.plC(n));
  }

  plC(n: number): PolicyCreation {
    return {
      name: `policy${n}`,
    };
  }
}
