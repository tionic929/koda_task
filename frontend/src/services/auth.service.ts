import api from "../lib/axios";
import type { AuthResponse, LoginCredentials } from "../types/auth.types";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};