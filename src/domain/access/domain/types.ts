import { PermissionType } from '@/domain/permission/common/types';

export interface FileResponse {
  id: number;
  path: string;
  isDirectory: boolean;
  lastModified: Date;
  size: number;
  myPerm: PermissionType;
}
