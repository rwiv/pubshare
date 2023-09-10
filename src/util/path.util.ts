import * as path from 'path';

const PROJECT_NAME = 'pubshare';

class PathUtil {
  getDirname() {
    return path.resolve();
  }

  abs() {
    const dirname = this.getDirname();
    return dirname.split(PROJECT_NAME)[0] + PROJECT_NAME;
  }
}

export const putil = new PathUtil();
