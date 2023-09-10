import { cutil } from '../util/config.util';
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client as Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

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
    return this.s3.send(command);
  }

  async download(key: string): Promise<GetObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new GetObjectCommand({ Bucket, Key });
    const a = await this.s3.send(command);
    return this.s3.send(command);
  }

  async upload(key: string, rs: Readable): Promise<PutObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new PutObjectCommand({ Bucket, Key, Body: rs });
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
