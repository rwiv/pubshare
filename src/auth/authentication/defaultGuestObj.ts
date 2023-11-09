import { AuthToken } from '@/auth/authentication/types';
import { accountTypeValues } from '@/domain/account/persistence/accountType';
import {AccountResponse} from "@/domain/account/web/types";
import {AccountType} from "../../../gui/src/client/account/types";

export const defaultGuestAuth: AuthToken = {
  id: -1,
  email: 'guest',
  certified: false,
  type: accountTypeValues.GUEST,
};

export const defaultGuestAccount: AccountResponse = {
  id: -1,
  email: 'guest',
  nickname: 'guest',
  certified: false,
  type: accountTypeValues.GUEST,
};
