import { cutil } from './cutil';

it('test', async () => {
  const conf = await cutil.getConf();
  console.log(conf.aws.accessKey);
  console.log(conf.aws.secretKey);
});
