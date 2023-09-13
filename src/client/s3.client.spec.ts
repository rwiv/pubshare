import { S3Client } from './s3.client';
import * as fs from 'fs-extra';
import * as path from 'path';
import { putil } from '../util/putil';

const client = new S3Client();

it('list', async () => {
  const res = await client.list('');
  console.log(res);
  console.log(res.CommonPrefixes);
  console.log(res.Contents);
});

it('head', async () => {
  const head = await client.head('test123.txt');
  console.log(head);
});

it('mkdir', async () => {
  const res = await client.mkdir('testdir');
  console.log(res);
});

function waitForEnd(ws: fs.WriteStream): Promise<string> {
  return new Promise((resolve, reject) => {
    ws.on('close', () => {
      resolve('end');
    });
    ws.on('error', () => {
      reject('end');
    });
  });
}

it('download', async () => {
  const res = await client.download('test123.txt');
  console.log(res);
  const p = path.resolve(putil.absRoot(), 'test', 'asset', 'download.txt');
  const rs = fs.createWriteStream(p);
  (res.Body as any).pipe(rs);
  await waitForEnd(rs);
});

it('upload', async () => {
  const p = path.resolve(putil.absRoot(), 'test', 'asset', 'test.txt');
  const rs = fs.createReadStream(p);
  const res = await client.upload('test123.txt', rs);
  console.log(res);
});

it('delete', async () => {
  const res = await client.delete('testdir/');
  // const res = await client.delete('test123.txt');
  console.log(res);
});
