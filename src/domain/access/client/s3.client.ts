import { cutil } from '@/util/cutil';
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  HeadObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client as Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { accessConfig } from '@/domain/access/config/accessConfig';
import { FileInfo } from '@/domain/access/client/FileInfo';

export class S3Client {
  private aws = cutil.getConfSync().aws;
  private s3 = this.getClient();

  async list(
    prefix: string,
    limit: number = accessConfig.listLimit,
  ): Promise<FileInfo[]> {
    const command = new ListObjectsCommand({
      Bucket: this.aws.bucketName,
      Prefix: prefix,
      Delimiter: '/',
      MaxKeys: limit,
    });

    const res = await this.s3.send(command);
    const files = res.Contents.map((obj) => {
      return new FileInfo(obj.Key, true, obj.LastModified, obj.Size);
    });

    const prefixes = res.CommonPrefixes;
    for (const prefix of prefixes) {
      const info = await this.head(prefix.Prefix);
      files.push(info);
    }
    return files;
  }

  async head(key: string): Promise<FileInfo> {
    const command = new HeadObjectCommand({
      Bucket: this.aws.bucketName,
      Key: key,
    });
    const res = await this.s3.send(command);
    return new FileInfo(
      key,
      this.isDirectory(key),
      res.LastModified,
      res.ContentLength,
    );
  }

  async download(key: string): Promise<GetObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new GetObjectCommand({ Bucket, Key });
    return this.s3.send(command);
  }

  async upload(key: string, rs: Readable) {
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

  private isDirectory(key: string): boolean {
    return key.charAt(key.length - 1) == '/';
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
