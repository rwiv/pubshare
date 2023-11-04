import { PrismaConnect } from '@/misc/prisma.types';

export interface RoleCreation {
  account: PrismaConnect;
  policy: PrismaConnect;
}
