import { Role } from '../domain/user.role';

interface UserResponse {
  id: number;
  email: string;
  certified: boolean;
  role: Role;
}

export interface UserCreation {
  email: string;
  password: string;
  certified: boolean;
  role: Role;
}

export interface UserUpdate {
  email: string;
  password: string;
  certified: boolean;
  role: Role;
}
