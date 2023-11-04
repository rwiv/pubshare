import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleDummyBuilder } from '@/domain/permission/role/dev/RoleDummyBuilder';

@Module({
  providers: [PrismaService, RoleRepository, RoleService, RoleDummyBuilder],
  exports: [RoleService],
})
export class RoleModule {}
