export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  profileImage?: string;
  bio?: string;
  skills?: string[];
  portfolioItems?: PortfolioItem[];
  profileStatus: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    profileStatus: string;
  };
}
