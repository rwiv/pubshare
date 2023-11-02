import * as path from 'path';

const PROJECT_NAME = 'pubshare';

export function getDirname() {
  return path.resolve();
}

export function absRoot() {
  const dirname = getDirname();
  return dirname.split(PROJECT_NAME)[0] + PROJECT_NAME;
}
