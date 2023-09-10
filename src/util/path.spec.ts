import { putil } from './path.util';

it('test', () => {
  const dirname = putil.getDirname();
  console.log(dirname);
  console.log(putil.abs());
});
