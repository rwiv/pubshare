import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/PrismaService';
import { RoleRepository } from '@/domain/permission/role/persistence/RoleRepository';
import { RoleService } from '@/domain/permission/role/domain/RoleService';

@Module({
  providers: [PrismaService, RoleRepository, RoleService],
})
export class RoleModule {}
