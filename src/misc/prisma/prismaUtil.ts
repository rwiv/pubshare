import { PrismaConnect } from '@/misc/prisma/prisma.types';

export function toPrismaConnect(id: number): PrismaConnect {
  return {
    connect: { id },
  };
}
