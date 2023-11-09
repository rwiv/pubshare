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
