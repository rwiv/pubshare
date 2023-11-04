export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

interface ValueType {
  MEMBER: AccountType;
  ADMIN: AccountType;
  GUEST: AccountType;
}

export const AccountTypeValues: ValueType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
};

export function getTypes(type: AccountType) {
  switch (type) {
    case AccountTypeValues.ADMIN:
      return [AccountTypeValues.ADMIN, AccountTypeValues.MEMBER];
    case AccountTypeValues.MEMBER:
      return [AccountTypeValues.MEMBER];
    default:
      throw Error('not support account type');
  }
}
