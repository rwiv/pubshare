import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { PolicyRepository } from '@/domain/permission/policy/persistence/PolicyRepository';
import { PolicyService } from '@/domain/permission/policy/domain/PolicyService';

@Module({
  providers: [PrismaService, PolicyRepository, PolicyService],
})
export class PolicyModule {}
