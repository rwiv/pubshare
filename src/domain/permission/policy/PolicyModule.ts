import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { PolicyRepository } from '@/domain/permission/policy/persistence/PolicyRepository';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PolicyDummyBuilder } from '@/domain/permission/policy/dev/PolicyDummyBuilder';

@Module({
  providers: [
    PrismaService,
    PolicyRepository,
    PolicyService,
    PolicyDummyBuilder,
  ],
})
export class PolicyModule {}
