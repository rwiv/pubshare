import { PermissionType } from '@/domain/permission/common/types';

interface File {
  id: number;
  path: string;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
}

interface FileCreation {
  path: string;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
}
