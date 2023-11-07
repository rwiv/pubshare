import { PrismaConnect } from '@/misc/prisma/prisma.types';

interface FileComment {
  id: number;
  fileId: number;
  createdById: number;
  parentId?: number;
  content: string;
}

interface FileCommentCreationPrisma {
  content: string;
  file: PrismaConnect;
  createdBy: PrismaConnect;
  parent?: PrismaConnect;
}
