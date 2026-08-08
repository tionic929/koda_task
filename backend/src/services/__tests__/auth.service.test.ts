import { describe, it, expect, vi } from "vitest";
import { loginUser, getUserById } from "../auth.service.js";
import { prisma } from "../../lib/prisma.js";
import { hashPassword } from "../../utils/password.js";

describe("Auth Service", () => {
  it("should fail login when user does not exist", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);

    await expect(
      loginUser({ email: "nonexistent@agency.com", password: "password123" })
    ).rejects.toEqual({ status: 401, message: "Invalid email or password" });
  });

  it("should fail login with wrong password", async () => {
    const hashedPassword = await hashPassword("realPassword");
    vi.spyOn(prisma.user, "findUnique").mockResolvedValueOnce({
      id: "u-1",
      email: "admin@agency.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      loginUser({ email: "admin@agency.com", password: "wrongPassword" })
    ).rejects.toEqual({ status: 401, message: "Invalid email or password" });
  });

  it("should successfully login with correct credentials and return token", async () => {
    const hashedPassword = await hashPassword("correctPassword");
    vi.spyOn(prisma.user, "findUnique").mockResolvedValueOnce({
      id: "u-1",
      email: "admin@agency.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await loginUser({ email: "admin@agency.com", password: "correctPassword" });

    expect(result.user.email).toBe("admin@agency.com");
    expect(result.token).toBeDefined();
  });

  it("should fetch user profile by ID", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValueOnce({
      id: "u-1",
      email: "admin@agency.com",
      name: "Admin User",
      role: "ADMIN",
      avatar: null,
      createdAt: new Date(),
    } as any);

    const user = await getUserById("u-1");
    expect(user.email).toBe("admin@agency.com");
  });

  it("should throw 404 when getting non-existent user profile", async () => {
    vi.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);

    await expect(getUserById("non-existent")).rejects.toEqual({
      status: 404,
      message: "User not found",
    });
  });
});
