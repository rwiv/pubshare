export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthToken {
  id: number;
  email: string;
  certified: boolean;
  type: string;
}
