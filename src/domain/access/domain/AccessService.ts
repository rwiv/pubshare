import { Injectable } from '@nestjs/common';
import { S3Client } from '@/domain/access/client/S3Client';
import {
  AccessFileRequest,
  FileUploadRequest,
} from '@/domain/access/web/types';
import { FileService } from '@/domain/file/file/domain/FileService';
import { FileResponse } from '@/domain/access/domain/types';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { SecurityContext } from '@/auth/authentication/types';
import { File } from '@/domain/file/file/persistence/types';
import { S3File } from '@/domain/access/client/types';
import { accessConfig } from '@/domain/access/common/accessConfig';
import { permissionTypeValues } from '@/domain/permission/common/types';
import { AuthorizationException } from '@/auth/authorization/AuthorizationException';

@Injectable()
export class AccessService {
  private client = new S3Client();

  constructor(
    private readonly fileService: FileService,
    private readonly permissionVerifier: PermissionVerifier,
  ) {}

  async head(auth: SecurityContext, key: string): Promise<FileResponse | null> {
    const s3File = await this.client.head(key);
    const fileResponse = await this.getFileResponse(auth, s3File);
    if (fileResponse.myPerm === permissionTypeValues.FORBIDDEN) {
      return null;
    }
    return fileResponse;
  }

  async list(auth: SecurityContext, key: string): Promise<FileResponse[]> {
    const s3Files = await this.client.list(key);
    const result: FileResponse[] = [];
    for (const s3File of s3Files) {
      const fileResponse = await this.getFileResponse(auth, s3File);
      if (fileResponse.myPerm !== permissionTypeValues.FORBIDDEN) {
        result.push(fileResponse);
      }
    }
    return result;
  }

  private async getFileResponse(
    auth: SecurityContext,
    s3File: S3File,
  ): Promise<FileResponse> {
    let fileDao = await this.fileService.findByPath(s3File.key);
    if (fileDao === null) {
      fileDao = await this.fileService.create({
        path: s3File.key,
        memberDefaultPerm: accessConfig.memberDefaultPerm,
        guestDefaultPerm: accessConfig.guestDefaultPerm,
      });
    }

    const myPerm = await this.permissionVerifier.verify(auth, fileDao as File);
    return {
      id: fileDao.id,
      path: s3File.key,
      isDirectory: s3File.isDirectory,
      lastModified: s3File.lastModified,
      size: s3File.size,
      myPerm,
    };
  }

  async download(auth: SecurityContext, key: string) {
    const fileResponse = await this.head(auth, key);
    if (fileResponse === null || this.isReadable(fileResponse)) {
      throw new AuthorizationException('not have permission');
    }
    return this.client.download(key);
  }

  private isReadable(fileResponse: FileResponse) {
    return [permissionTypeValues.READ, permissionTypeValues.WRITE].includes(
      fileResponse.myPerm,
    );
  }

  private isWritable(fileResponse: FileResponse) {
    return [permissionTypeValues.WRITE].includes(fileResponse.myPerm);
  }

  async mkdir(auth: SecurityContext, req: AccessFileRequest) {
    return this.client.mkdir(req.key);
  }

  async upload(
    auth: SecurityContext,
    req: FileUploadRequest,
    file: Express.Multer.File,
  ) {
    const fileResponse = await this.head(auth, this.getParentKey(req.key));
    if (fileResponse === null || this.isWritable(fileResponse)) {
      throw new AuthorizationException('not have permission');
    }
    await this.client.upload(req.key, file.stream);
    return this.fileService.create(req.fileCreation);
  }

  private getParentKey(key: string) {
    const chunks = key.split('/');
    chunks.pop();
    let result = chunks.join('/');
    if (result === '') {
      return result;
    }

    if (key.charAt(key.length - 1) !== '/') {
      result += '/';
    }
    return result;
  }

  async delete(auth: SecurityContext, req: AccessFileRequest) {
    return this.client.delete(req.key);
  }
}
