import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  roles: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
}

export const authService = {
  // POST /api/users/login - Login endpoint through Gateway
  login: async (data: LoginRequest) => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  // POST /api/users/register - Register endpoint through Gateway
  register: async (data: RegisterRequest) => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  // Logout - Clear local storage
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get JWT token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // GET /api/users/profile - Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // PUT /api/users/profile - Update user profile
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },
};
