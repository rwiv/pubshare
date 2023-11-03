import { dbInit } from '@/util/dbInit';

it('test', async () => {
  const result = dbInit();
  console.log(result.toString());
});
