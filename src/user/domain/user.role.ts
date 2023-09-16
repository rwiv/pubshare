export const RoleType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
};

export type Role = 'MEMBER' | 'ADMIN';

export function getRoles(role: Role) {
  switch (role) {
    case RoleType.ADMIN:
      return [RoleType.ADMIN, RoleType.MEMBER];
    case RoleType.MEMBER:
      return [RoleType.MEMBER];
    default:
      throw Error('not support role type');
  }
}
