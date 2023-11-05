import { PrismaConnect } from '@/misc/prisma/prisma.types';

export interface RoleCreation {
  account: PrismaConnect;
  policy: PrismaConnect;
}
