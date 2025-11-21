import { User, LoginResponse } from '@/types/user';

const API_BASE = '/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to make authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add any custom headers from options
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  register: async (name: string, email: string, password: string, role: string = 'user'): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  },
};

// User APIs (admin only)
export const userAPI = {
  getAll: async (): Promise<{ users: User[]; count: number }> => {
    const response = await authFetch(`${API_BASE}/users`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch users');
    }

    return response.json();
  },

  getById: async (id: string): Promise<{ user: User }> => {
    const response = await authFetch(`${API_BASE}/users/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }

    return response.json();
  },

  create: async (userData: Partial<User>): Promise<{ message: string; user: User }> => {
    const response = await authFetch(`${API_BASE}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }

    return response.json();
  },

  update: async (id: string, userData: Partial<User>): Promise<{ message: string; user: User }> => {
    const response = await authFetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }

    return response.json();
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await authFetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }

    return response.json();
  },
};

// Portfolio APIs (public)
export const portfolioAPI = {
  getAll: async (): Promise<{ portfolios: User[]; count: number }> => {
    const response = await fetch(`${API_BASE}/portfolios`);

    if (!response.ok) {
      throw new Error('Failed to fetch portfolios');
    }

    return response.json();
  },
};
