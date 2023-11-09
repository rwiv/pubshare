import { NotSupportedException } from '@/misc/error/exception/NotSupportedException';

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

export function getHierarchicalTypes(type: AccountType) {
  switch (type) {
    case accountTypes.ADMIN:
      return [accountTypes.ADMIN, accountTypes.MEMBER];
    case accountTypes.MEMBER:
      return [accountTypes.MEMBER];
    default:
      throw new NotSupportedException('not supported account type');
  }
}
