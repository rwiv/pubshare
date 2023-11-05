import { NotSupportedException } from '@/misc/error/exception/NotSupportedException';

export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

interface ValueType {
  MEMBER: AccountType;
  ADMIN: AccountType;
  GUEST: AccountType;
}

export const accountTypeValues: ValueType = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
};

export function getTypes(type: AccountType) {
  switch (type) {
    case accountTypeValues.ADMIN:
      return [accountTypeValues.ADMIN, accountTypeValues.MEMBER];
    case accountTypeValues.MEMBER:
      return [accountTypeValues.MEMBER];
    default:
      throw new NotSupportedException('not supported account type');
  }
}
