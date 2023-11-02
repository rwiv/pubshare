import { absRoot, getDirname } from './putil';

it('test', () => {
  const dirname = getDirname();
  console.log(dirname);
  console.log(absRoot());
});
