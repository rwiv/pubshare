import { PrismaConnect } from '@/misc/prisma/prisma.types';

interface FileCommentCreation {
  content: string;
  file: PrismaConnect;
  createdBy: PrismaConnect;
  parent?: PrismaConnect;
}
