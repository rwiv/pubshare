export interface LoginRequest {
  email: string;
  password: string;
}

export interface SecurityContext {
  id: number;
  email: string;
  certified: boolean;
  type: string;
}
