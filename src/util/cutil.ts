import * as fs from 'fs-extra';
import * as path from 'path';
import { putil } from './putil';
import { AppConfig } from './config';

class ConfigUtil {
  async getConf(): Promise<AppConfig> {
    const p = path.resolve(putil.absRoot(), 'conf', 'conf.json');
    const json = await fs.readFile(p, { encoding: 'utf-8' });
    return JSON.parse(json);
  }

  getConfSync(): AppConfig {
    const p = path.resolve(putil.absRoot(), 'conf', 'conf.json');
    const json = fs.readFileSync(p, { encoding: 'utf-8' });
    return JSON.parse(json);
  }
}

export const cutil = new ConfigUtil();
