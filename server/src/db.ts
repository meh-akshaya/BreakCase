import { PrismaClient } from '@prisma/client';
import path from 'path';

const absoluteDbPath = path.resolve(__dirname, '../../prisma/dev.db');

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL?.startsWith('file:/')
        ? process.env.DATABASE_URL
        : `file:${absoluteDbPath}`,
    },
  },
});
