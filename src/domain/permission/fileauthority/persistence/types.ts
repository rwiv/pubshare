import { PrismaConnect } from '@/misc/prisma.types';

export interface FileAuthorityCreation {
  file: PrismaConnect;
  account: PrismaConnect;
  permission: string;
}
