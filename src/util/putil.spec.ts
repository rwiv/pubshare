import { putil } from './putil';

it('test', () => {
  const dirname = putil.getDirname();
  console.log(dirname);
  console.log(putil.absRoot());
});
