import { PrismaConnect } from '@/misc/prisma/prisma.types';
import { PermissionType } from '@/domain/permission/common/types';

export interface FileAuthorityCreationPrisma {
  file: PrismaConnect;
  account: PrismaConnect;
  permission: PermissionType;
}
