import * as fs from 'fs-extra';
import * as path from 'path';
import { absRoot } from '@/util/putil';
import { AppConfig } from '@/util/config.types';

export async function getConf(): Promise<AppConfig> {
  const p = path.resolve(absRoot(), 'conf', 'conf.json');
  const json = await fs.readFile(p, { encoding: 'utf-8' });
  return JSON.parse(json);
}

export function getConfSync(): AppConfig {
  const p = path.resolve(absRoot(), 'conf', 'conf.json');
  const json = fs.readFileSync(p, { encoding: 'utf-8' });
  return JSON.parse(json);
}
