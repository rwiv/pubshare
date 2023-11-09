import { Module } from '@nestjs/common';
import { PrismaService } from '@/misc/prisma/PrismaService';
import { FileRoleRepository } from '@/domain/permission/filerole/persistence/FileRoleRepository';
import { FileRoleService } from '@/domain/permission/filerole/domain/FileRoleService';
import { FileRoleDummyBuilder } from '@/domain/permission/filerole/dev/FileRoleDummyBuilder';
import { FileRoleController } from '@/domain/permission/filerole/web/FileRoleController';
import { RoleModule } from '@/domain/permission/role/RoleModule';

@Module({
  controllers: [FileRoleController],
  providers: [
    PrismaService,
    FileRoleRepository,
    FileRoleService,
    FileRoleDummyBuilder,
  ],
  imports: [RoleModule],
  exports: [FileRoleService],
})
export class FileRoleModule {}
