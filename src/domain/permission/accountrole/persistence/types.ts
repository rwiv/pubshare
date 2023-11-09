import { PrismaConnect } from '@/misc/prisma/prisma.types';

export interface AccountRoleCreationPrisma {
  account: PrismaConnect;
  policy: PrismaConnect;
}
