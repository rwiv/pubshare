export type PermissionType = 'FORBIDDEN' | 'KNOWN' | 'READ' | 'WRITE';

export interface FileResponse {
  id: number;
  path: string;
  isDirectory: boolean;
  lastModified: Date;
  size: number;
  myPerm: PermissionType;
}
