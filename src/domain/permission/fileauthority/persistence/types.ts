import { PrismaConnect } from '@/misc/prisma.types';
import { PermissionType } from '@/domain/permission/common/types';

export interface FileAuthorityCreation {
  file: PrismaConnect;
  account: PrismaConnect;
  permission: PermissionType;
}
