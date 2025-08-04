export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  avatar?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}