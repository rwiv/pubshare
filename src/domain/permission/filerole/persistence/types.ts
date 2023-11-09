import { PrismaConnect } from '@/misc/prisma/prisma.types';
import { PermissionType } from '@/domain/permission/common/types';

export interface FileRoleCreationPrisma {
  file: PrismaConnect;
  role: PrismaConnect;
  permission: PermissionType;
}
