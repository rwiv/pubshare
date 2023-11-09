export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

interface ValueType {
  MEMBER: AccountType;
  ADMIN: AccountType;
  GUEST: AccountType;
}

export const accountTypes: ValueType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
};
