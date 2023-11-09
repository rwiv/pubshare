import { AuthToken } from '@/auth/authentication/types';
import { accountTypeValues } from '@/domain/account/persistence/accountType';
import { AccountResponse } from '@/domain/account/web/types';

export const defaultGuestAuth: AuthToken = {
  username: 'guest',
  type: accountTypeValues.GUEST,
};
