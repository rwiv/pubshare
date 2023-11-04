import { Body, Controller, Get, Post } from '@nestjs/common';
import { PolicyCreation } from '@/domain/permission/policy/persistence/types';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';

@Controller('api/perm/policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  create(@Body() creation: PolicyCreation) {
    return this.policyService.create(creation);
  }

  @Get()
  findAll() {
    return this.policyService.findAll();
  }
}
