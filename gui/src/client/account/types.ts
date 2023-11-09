
export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

export interface AccountResponse {
  id: number;
  username: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}

export interface AccountCreation {
  username: string;
  password: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
