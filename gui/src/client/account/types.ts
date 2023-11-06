
export type AccountType = 'MEMBER' | 'ADMIN' | 'GUEST';

export interface AccountResponse {
  id: number;
  email: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}

export interface AccountCreation {
  email: string;
  password: string;
  nickname: string;
  certified: boolean;
  type: AccountType;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
