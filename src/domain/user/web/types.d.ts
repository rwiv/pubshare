import { UserRole } from '@/domain/user/domain/user.role';

interface UserResponse {
  id: number;
  email: string;
  certified: boolean;
  role: UserRole;
}

export interface UserCreation {
  email: string;
  password: string;
  certified: boolean;
  role: UserRole;
}

export interface UserUpdate {
  email: string;
  password: string;
  certified: boolean;
  role: UserRole;
}
