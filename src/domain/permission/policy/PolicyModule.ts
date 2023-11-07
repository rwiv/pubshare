import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { PolicyRepository } from '@/domain/permission/policy/persistence/PolicyRepository';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';
import { PolicyDummyBuilder } from '@/domain/permission/policy/dev/PolicyDummyBuilder';
import { PolicyController } from '@/domain/permission/policy/web/PolicyController';

@Module({
  controllers: [PolicyController],
  providers: [
    PrismaService,
    PolicyRepository,
    PolicyService,
    PolicyDummyBuilder,
  ],
  exports: [PolicyService, PolicyDummyBuilder],
})
export class PolicyModule {}
