import { Injectable } from '@nestjs/common';
import { S3Client } from '@/domain/access/client/S3Client';
import {
  AccessFileRequest,
  FileUploadRequest,
} from '@/domain/access/web/types';
import { FileService } from '@/domain/file/file/domain/FileService';

@Injectable()
export class AccessService {
  private client = new S3Client();

  constructor(private readonly fileService: FileService) {}

  head(key: string) {
    return this.client.head(key);
  }

  list(key: string) {
    return this.client.list(key);
  }

  download(key: string) {
    return this.client.download(key);
  }

  mkdir(req: AccessFileRequest) {
    return this.client.mkdir(req.key);
  }

  async upload(req: FileUploadRequest, file: Express.Multer.File) {
    const ent = await this.fileService.create(req.fileCreation);
    await this.client.upload(req.key, file.stream);
    return ent;
  }

  delete(req: AccessFileRequest) {
    return this.client.delete(req.key);
  }
}
