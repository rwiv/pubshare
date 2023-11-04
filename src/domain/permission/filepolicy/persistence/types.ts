import { PrismaConnect } from '@/misc/prisma.types';

export interface FilePolicyCreation {
  file: PrismaConnect;
  policy: PrismaConnect;
  permission: string;
}
