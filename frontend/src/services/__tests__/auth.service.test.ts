import { describe, it, expect, vi } from "vitest";
import { login, logout } from "../auth.service.js";
import api from "../../lib/axios.js";

describe("Frontend Auth Service", () => {
  it("should call login endpoint and return AuthResponse", async () => {
    const mockAuthResponse = {
      user: { id: "1", email: "admin@agency.com", name: "Admin", role: "ADMIN" },
      token: "jwt-token-123",
    };

    vi.spyOn(api, "post").mockResolvedValueOnce({ data: mockAuthResponse } as any);

    const credentials = { email: "admin@agency.com", password: "password123" };
    const result = await login(credentials);

    expect(api.post).toHaveBeenCalledWith("/auth/login", credentials);
    expect(result).toEqual(mockAuthResponse);
  });

  it("should clear localStorage on logout", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("user", JSON.stringify({ name: "User" }));

    await logout();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
