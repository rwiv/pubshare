export type PermissionType = 'FORBIDDEN' | 'KNOWN' | 'READ' | 'WRITE';

interface ValuesType {
  FORBIDDEN: PermissionType;
  KNOWN: PermissionType;
  READ: PermissionType;
  WRITE: PermissionType;
}

export const permissionTypeValues: ValuesType = {
  FORBIDDEN: 'FORBIDDEN',
  KNOWN: 'KNOWN',
  READ: 'READ',
  WRITE: 'WRITE',
};

export function permToPriority(type: string): (1 | 2 | 3 | 4) | null {
  switch (type) {
    case permissionTypeValues.FORBIDDEN:
      return 1;
    case permissionTypeValues.KNOWN:
      return 2;
    case permissionTypeValues.READ:
      return 3;
    case permissionTypeValues.WRITE:
      return 4;
    default:
      return null;
  }
}

export function priorityToPerm(priority: number): PermissionType | null {
  switch (priority) {
    case 1:
      return permissionTypeValues.FORBIDDEN;
    case 2:
      return permissionTypeValues.KNOWN;
    case 3:
      return permissionTypeValues.READ;
    case 4:
      return permissionTypeValues.WRITE;
    default:
      return null;
  }
}
