import { Injectable } from '@nestjs/common';
import { S3Client } from '@/domain/access/client/S3Client';
import {
  AccessFileRequest,
  FileUploadRequest,
} from '@/domain/access/web/types';
import { FileService } from '@/domain/file/file/domain/FileService';
import { FileResponse } from '@/domain/access/domain/types';
import { PermissionVerifier } from '@/domain/permission/verifier/PermissionVerifier';
import { AuthToken } from '@/auth/authentication/types';
import { File } from '@/domain/file/file/persistence/types';
import { S3File } from '@/domain/access/client/types';
import { accessConfig } from '@/domain/access/common/accessConfig';
import {PermissionType, permissionTypes} from '@/domain/permission/common/types';
import { AuthorizationException } from '@/auth/authorization/AuthorizationException';
import {AccessException} from "@/domain/access/common/AccessException";

@Injectable()
export class AccessService {
  private client = new S3Client();

  constructor(
    private readonly fileService: FileService,
    private readonly permissionVerifier: PermissionVerifier,
  ) {}

  async head(auth: AuthToken, key: string): Promise<FileResponse | null> {
    if (key === '') {
      return this.getRootFileResponse(auth);
    }
    const s3File = await this.client.head(key);
    const fileResponse = await this.getFileResponse(auth, s3File);
    if (fileResponse.myPerm === permissionTypes.FORBIDDEN) {
      return null;
    }
    return fileResponse;
  }

  async list(auth: AuthToken, key: string): Promise<FileResponse[]> {
    const s3Files = await this.client.list(key);
    const result: FileResponse[] = [];
    for (const s3File of s3Files) {
      const fileResponse = await this.getFileResponse(auth, s3File);
      if (fileResponse.myPerm !== permissionTypes.FORBIDDEN) {
        result.push(fileResponse);
      }
    }
    return result;
  }

  private async getFileResponse(
    auth: AuthToken,
    s3File: S3File,
  ): Promise<FileResponse> {
    let fileDao = await this.fileService.findByPath(s3File.key);
    const { memberDefaultPerm, guestDefaultPerm } = accessConfig;
    if (fileDao === null) {
      fileDao = await this.fileService.create({
        path: s3File.key,
        memberDefaultPerm,
        guestDefaultPerm,
      });
    }

    const myPerm = await this.permissionVerifier.verify(auth, fileDao as File);
    return {
      id: fileDao.id,
      path: s3File.key,
      isDirectory: s3File.isDirectory,
      lastModified: s3File.lastModified.toISOString(),
      size: s3File.size,
      memberDefaultPerm: fileDao.memberDefaultPerm as PermissionType,
      guestDefaultPerm: fileDao.guestDefaultPerm as PermissionType,
      myPerm,
    };
  }

  private async getRootFileResponse(auth: AuthToken): Promise<FileResponse> {
    let fileDao = await this.fileService.findByPath('');
    const { memberDefaultPerm, guestDefaultPerm } = accessConfig;
    if (fileDao === null) {
      fileDao = await this.fileService.create({
        path: '',
        memberDefaultPerm,
        guestDefaultPerm,
      });
    }

    const myPerm = await this.permissionVerifier.verify(auth, fileDao as File);
    return {
      id: fileDao.id,
      path: '',
      isDirectory: true,
      lastModified: null,
      size: null,
      memberDefaultPerm: fileDao.memberDefaultPerm as PermissionType,
      guestDefaultPerm: fileDao.guestDefaultPerm as PermissionType,
      myPerm,
    };
  }

  async download(auth: AuthToken, key: string) {
    const fileResponse = await this.head(auth, key);
    if (fileResponse === null || !this.isReadable(fileResponse)) {
      throw new AuthorizationException('not have permission');
    }
    return this.client.download(key);
  }

  private isReadable(fileResponse: FileResponse) {
    return [permissionTypes.READ, permissionTypes.WRITE].includes(
      fileResponse.myPerm,
    );
  }

  private isWritable(fileResponse: FileResponse) {
    return [permissionTypes.WRITE].includes(fileResponse.myPerm);
  }

  async mkdir(auth: AuthToken, req: AccessFileRequest) {
    return this.client.mkdir(req.key);
  }

  async upload(
    auth: AuthToken,
    req: FileUploadRequest,
    file: Express.Multer.File,
  ) {
    const directory = await this.head(auth, this.getParentKey(req.key));
    if (directory === null || !this.isWritable(directory)) {
      throw new AuthorizationException('not have permission');
    }
    await this.client.upload(req.key, file.buffer);
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

  async delete(auth: AuthToken, req: AccessFileRequest) {
    const file = await this.client.head(req.key);
    if (file.isDirectory) {
      const children = await this.client.list(file.key);
      if (children.length > 0) {
        throw new AccessException('file exists in the folder');
      }
    }
    await this.fileService.deleteByPath(req.key);
    return this.client.delete(req.key);
  }
}
