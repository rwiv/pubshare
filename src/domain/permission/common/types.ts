export type PermissionType = 'FORBIDDEN' | 'KNOWN' | 'READ' | 'WRITE';

interface ValuesType {
  FORBIDDEN: PermissionType;
  KNOWN: PermissionType;
  READ: PermissionType;
  WRITE: PermissionType;
}

export const permissionTypes: ValuesType = {
  FORBIDDEN: 'FORBIDDEN',
  KNOWN: 'KNOWN',
  READ: 'READ',
  WRITE: 'WRITE',
};

export function permToPriority(type: string): (1 | 2 | 3 | 4) | null {
  switch (type) {
    case permissionTypes.FORBIDDEN:
      return 1;
    case permissionTypes.KNOWN:
      return 2;
    case permissionTypes.READ:
      return 3;
    case permissionTypes.WRITE:
      return 4;
    default:
      return null;
  }
}

export function priorityToPerm(priority: number): PermissionType | null {
  switch (priority) {
    case 1:
      return permissionTypes.FORBIDDEN;
    case 2:
      return permissionTypes.KNOWN;
    case 3:
      return permissionTypes.READ;
    case 4:
      return permissionTypes.WRITE;
    default:
      return null;
  }
}
