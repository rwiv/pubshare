export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthToken {
  username: string;
  type: string;
}
