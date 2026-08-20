import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'breakcase-secret-key-2026-super-secure-jwt',
  databaseUrl: process.env.DATABASE_URL || 'file:../prisma/dev.db',
};
