import { getConfSync } from '@/util/cutil';
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
import { accessConfig } from '@/domain/access/common/accessConfig';
import { S3File } from '@/domain/access/client/types';
import { AccessException } from '@/domain/access/common/AccessException';

export class S3Client {
  private aws = getConfSync().aws;
  private s3 = this.getClient();

  async list(
    prefix: string,
    limit: number = accessConfig.listLimit,
  ): Promise<S3File[]> {
    const command = new ListObjectsCommand({
      Bucket: this.aws.bucketName,
      Prefix: prefix,
      Delimiter: '/',
      MaxKeys: limit,
    });

    const res = await this.s3.send(command);
    const contents = res.Contents;
    if (contents === undefined) {
      throw new AccessException(`list access failure, prefix: "${prefix}"`);
    }

    // add regular files
    const filtered = contents.filter((obj) => obj.Key !== prefix);
    const files = filtered.map((obj) => {
      return {
        key: obj.Key,
        isDirectory: false,
        lastModified: obj.LastModified,
        size: obj.Size,
      };
    });

    // add directories
    const prefixes = res.CommonPrefixes;
    if (prefixes === undefined) {
      return files;
    }
    for (const prefix of prefixes) {
      const s3File = await this.head(prefix.Prefix);
      files.push(s3File);
    }
    return files;
  }

  async head(key: string): Promise<S3File> {
    const command = new HeadObjectCommand({
      Bucket: this.aws.bucketName,
      Key: key,
    });
    const res = await this.s3.send(command);
    return {
      key,
      isDirectory: this.isDirKey(key),
      lastModified: res.LastModified,
      size: res.ContentLength,
    };
  }

  async download(key: string): Promise<GetObjectCommandOutput> {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new GetObjectCommand({ Bucket, Key });
    return this.s3.send(command);
  }

  async upload(key: string, buffer: Buffer) {
    const { Bucket, Key } = this.getBucketAndKey(key);
    const command = new PutObjectCommand({ Bucket, Key, Body: buffer });
    return this.s3.send(command);
  }

  async mkdir(key: string) {
    let Key = key;
    if (!this.isDirKey(key)) {
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

  private isDirKey(key: string): boolean {
    return key.charAt(key.length - 1) === '/';
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
