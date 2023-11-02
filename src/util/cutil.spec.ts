import { getConf } from '@/util/cutil';

it('test', async () => {
  const conf = await getConf();
  console.log(conf.aws.accessKey);
  console.log(conf.aws.secretKey);
});
