import { cutil } from '../util/cutil';
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  HeadObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client as Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { FileResponse } from './FileResponse';

export class S3Client {
  private aws = cutil.getConfSync().aws;
  private s3 = this.getClient();

  async list(
    prefix: string,
    limit: number = 10000,
  ): Promise<ListObjectsCommandOutput> {
    const command = new ListObjectsCommand({
      Bucket: this.aws.bucketName,
      Prefix: prefix,
      Delimiter: '/',
      MaxKeys: limit,
    });
    // const res = await this.s3.send(command);
    // const contents = res.Contents;
    // const prefixes = res.CommonPrefixes;

    return this.s3.send(command);
  }

  async head(key: string) {
    const command = new HeadObjectCommand({
      Bucket: this.aws.bucketName,
      Key: key,
    });
    const res = await this.s3.send(command);
    return new FileResponse(
      key,
      this.isDirectory(key),
      res.LastModified,
      res.ContentLength,
    );
  }

  private isDirectory(key: string) {
    return key.charAt(key.length - 1) == '/';
  }

  async download(key: string): Promise<GetObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new GetObjectCommand({ Bucket, Key });
    return this.s3.send(command);
  }

  async upload(key: string, rs: Readable): Promise<PutObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new PutObjectCommand({ Bucket, Key, Body: rs });
    return this.s3.send(command);
  }

  async mkdir(key: string) {
    let Key = key;
    if (Key.charAt(Key.length - 1) !== '/') {
      Key = Key + '/';
    }
    const Bucket = this.aws.bucketName;
    const command = new PutObjectCommand({ Bucket, Key });
    return this.s3.send(command);
  }

  async delete(key: string): Promise<DeleteObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new DeleteObjectCommand({ Bucket, Key });
    return this.s3.send(command);
  }

  private getBucketAndKey(key: string) {
    return {
      Bucket: this.aws.bucketName,
      Key: key,
    };
  }

  private getClient() {
    const { accessKey, secretKey, region } = this.aws;
    return new Client({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }
}
