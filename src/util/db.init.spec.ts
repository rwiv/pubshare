import { dbInit } from '@/util/db.init';

it('test', async () => {
  const result = dbInit();
  console.log(result.toString());
});
