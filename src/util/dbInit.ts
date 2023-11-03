import { execSync } from 'child_process';

export function dbInit() {
  return execSync('npx prisma migrate reset --force && pnpm migrate');
}
