import { env } from '@app/env.mjs';
import { PrismaClient } from '@prisma/client';

export const prismaYoga = new PrismaClient({
   log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
   globalForPrisma.prisma ||
   new PrismaClient({
      log:
         env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
   });

if (env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;
