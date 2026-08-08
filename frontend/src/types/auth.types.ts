export interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}