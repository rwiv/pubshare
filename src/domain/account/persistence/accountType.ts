export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

export const AccountTypeObj = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
};

export function getTypes(type: AccountType) {
  switch (type) {
    case AccountTypeObj.ADMIN:
      return [AccountTypeObj.ADMIN, AccountTypeObj.MEMBER];
    case AccountTypeObj.MEMBER:
      return [AccountTypeObj.MEMBER];
    default:
      throw Error('not support account type');
  }
}
