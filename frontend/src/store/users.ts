import { create } from 'zustand';
import { User, CreateUserData, UpdateUserData, UsersResponse } from '@/types/user';
import api from '@/lib/api';

interface UsersState {
  users: User[];
  currentUser: User | null;
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

interface UsersStore extends UsersState {
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  createUser: (data: CreateUserData) => Promise<User>;
  updateUser: (id: number, data: UpdateUserData) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  toggleUserActive: (id: number) => Promise<User>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentUser: () => void;
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  users: [],
  currentUser: null,
  total: 0,
  page: 1,
  totalPages: 0,
  isLoading: false,
  error: null,

  fetchUsers: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);
      const { users, total, totalPages } = response.data;

      set({
        users,
        total,
        page,
        totalPages,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao carregar usuários',
        isLoading: false,
      });
    }
  },

  fetchUser: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get<User>(`/users/${id}`);
      set({
        currentUser: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao carregar usuário',
        isLoading: false,
      });
    }
  },

  createUser: async (data: CreateUserData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<User>('/users', data);
      const newUser = response.data;

      set((state) => ({
        users: [newUser, ...state.users],
        total: state.total + 1,
        isLoading: false,
      }));

      return newUser;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao criar usuário',
        isLoading: false,
      });
      throw error;
    }
  },

  updateUser: async (id: number, data: UpdateUserData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch<User>(`/users/${id}`, data);
      const updatedUser = response.data;

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? updatedUser : user
        ),
        currentUser: state.currentUser?.id === id ? updatedUser : state.currentUser,
        isLoading: false,
      }));

      return updatedUser;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao atualizar usuário',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.delete(`/users/${id}`);

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        total: state.total - 1,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao deletar usuário',
        isLoading: false,
      });
      throw error;
    }
  },

  toggleUserActive: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.patch<User>(`/users/${id}/toggle-active`);
      const updatedUser = response.data;

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? updatedUser : user
        ),
        isLoading: false,
      }));

      return updatedUser;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao alterar status do usuário',
        isLoading: false,
      });
      throw error;
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearCurrentUser: () => {
    set({ currentUser: null });
  },
}));