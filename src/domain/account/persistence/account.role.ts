export const RoleType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
};

export type AccountRole = 'MEMBER' | 'ADMIN';

export function getRoles(role: AccountRole) {
  switch (role) {
    case RoleType.ADMIN:
      return [RoleType.ADMIN, RoleType.MEMBER];
    case RoleType.MEMBER:
      return [RoleType.MEMBER];
    default:
      throw Error('not support role type');
  }
}
