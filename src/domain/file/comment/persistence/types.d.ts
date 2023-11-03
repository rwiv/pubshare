import { PrismaConnect } from '@/misc/prisma.types';

interface FileCommentCreation {
  content: string;
  file: PrismaConnect;
  createdBy: PrismaConnect;
  parent?: PrismaConnect;
}
