import { PermissionType } from '@/domain/permission/common/types';

export interface FileResponse {
  id: number;
  path: string;
  isDirectory: boolean;
  lastModified: string | null;
  size: number | null;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
  myPerm: PermissionType;
}
