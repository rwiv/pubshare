import { FileCreation } from '@/domain/file/file/persistence/types';

export interface AccessFileRequest {
  key: string;
}

export interface FileUploadRequest {
  key: string;
  fileCreation: FileCreation;
}
