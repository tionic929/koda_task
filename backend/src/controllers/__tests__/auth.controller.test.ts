import { describe, it, expect, vi } from "vitest";
import { login, getProfile } from "../auth.controller.js";
import * as authService from "../../services/auth.service.js";
import type { Request, Response, NextFunction } from "express";

describe("Auth Controller", () => {
  it("should return 200 with user and token on successful login", async () => {
    const mockAuthResult = {
      user: { id: "1", email: "admin@agency.com", name: "Admin", role: "ADMIN" },
      token: "mock-jwt-token",
    };

    vi.spyOn(authService, "loginUser").mockResolvedValueOnce(mockAuthResult);

    const req = { body: { email: "admin@agency.com", password: "password123" } } as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    await login(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAuthResult);
  });

  it("should pass error to next() on login failure", async () => {
    const err = new Error("Invalid credentials");
    vi.spyOn(authService, "loginUser").mockRejectedValueOnce(err);

    const req = { body: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  it("should return profile for authenticated request", async () => {
    const mockProfile = { id: "1", email: "admin@agency.com", name: "Admin", role: "ADMIN" };
    vi.spyOn(authService, "getUserById").mockResolvedValueOnce(mockProfile as any);

    const req = { user: { id: "1", userId: "1", email: "admin@agency.com", role: "ADMIN" } } as any;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    await getProfile(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProfile);
  });
});
