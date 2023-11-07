export type PermissionType = 'FORBIDDEN' | 'KNOWN' | 'READ' | 'WRITE';

export interface FileResponse {
  id: number;
  path: string;
  isDirectory: boolean;
  lastModified: string;
  size: number;
  myPerm: PermissionType;
}

interface FileCreation {
  path: string;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
}

export interface AccessFileRequest {
  key: string;
}

export interface FileUploadRequest {
  key: string;
  fileCreation: FileCreation;
}
