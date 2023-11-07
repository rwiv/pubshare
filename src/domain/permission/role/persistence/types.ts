import { PrismaConnect } from '@/misc/prisma/prisma.types';

export interface RoleCreationPrisma {
  account: PrismaConnect;
  policy: PrismaConnect;
}
