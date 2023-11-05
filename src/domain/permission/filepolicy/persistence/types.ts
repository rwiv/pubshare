import { PrismaConnect } from '@/misc/prisma/prisma.types';
import { PermissionType } from '@/domain/permission/common/types';

export interface FilePolicyCreation {
  file: PrismaConnect;
  policy: PrismaConnect;
  permission: PermissionType;
}
