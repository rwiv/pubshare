import { PermissionType } from '@/domain/permission/common/types';

interface FileCreation {
  path: string;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
}
