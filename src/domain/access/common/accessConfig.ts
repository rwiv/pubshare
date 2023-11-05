import { PermissionType } from '@/domain/permission/common/types';

interface AccessConfigType {
  listLimit: number;
  memberDefaultPerm: PermissionType;
  guestDefaultPerm: PermissionType;
}

export const accessConfig: AccessConfigType = {
  listLimit: 10000,
  memberDefaultPerm: 'FORBIDDEN',
  guestDefaultPerm: 'FORBIDDEN',
};
