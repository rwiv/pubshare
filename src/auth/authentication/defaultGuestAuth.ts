import { AuthToken } from '@/auth/authentication/types';
import { accountTypes } from '@/domain/account/persistence/accountType';

export const defaultGuestAuth: AuthToken = {
  username: 'guest',
  type: accountTypes.GUEST,
};
