import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleService } from '@/domain/permission/role/domain/RoleService';
import { RoleDummyBuilder } from '@/domain/permission/role/dev/RoleDummyBuilder';
import { RoleController } from '@/domain/permission/role/web/RoleController';

@Module({
  controllers: [RoleController],
  providers: [
    PrismaService,
    RoleRepository,
    RoleService,
    RoleDummyBuilder,
  ],
  exports: [RoleService, RoleDummyBuilder],
})
export class RoleModule {}
