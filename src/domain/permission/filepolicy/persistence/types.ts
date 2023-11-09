import { PrismaConnect } from '@/misc/prisma/prisma.types';
import { PermissionType } from '@/domain/permission/common/types';

export interface FilePolicyCreationPrisma {
  file: PrismaConnect;
  role: PrismaConnect;
  permission: PermissionType;
}
