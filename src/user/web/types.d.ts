interface UserResponse {
  id: number;
  email: string;
  certified: boolean;
}

export interface UserCreation {
  email: string;
  password: string;
  certified: boolean;
}

export interface UserUpdate {
  email: string;
  password: string;
  certified: boolean;
}
