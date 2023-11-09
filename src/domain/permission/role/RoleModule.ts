import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleDummyBuilder } from '@/domain/permission/role/dev/RoleDummyBuilder';
import { RoleController } from '@/domain/permission/role/web/RoleController';
import { PolicyModule } from '@/domain/permission/policy/PolicyModule';

@Module({
  controllers: [RoleController],
  providers: [PrismaService, RoleRepository, RoleService, RoleDummyBuilder],
  imports: [PolicyModule],
  exports: [RoleService],
})
export class RoleModule {}
