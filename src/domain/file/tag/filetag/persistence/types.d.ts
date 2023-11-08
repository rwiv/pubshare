import { PrismaConnect } from '@/misc/prisma/prisma.types';

interface FileTagCreation {
  file: PrismaConnect;
  tag: PrismaConnect;
}
