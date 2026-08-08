import { describe, it, expect, vi } from "vitest";
import { authenticate, requireRole, type AuthenticatedRequest } from "../auth.middleware.js";
import { signToken } from "../../utils/jwt.js";
import type { Response, NextFunction } from "express";

const createMockRes = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

describe("Auth Middleware", () => {
  it("should return 401 if authorization header is missing", () => {
    const req = { headers: {} } as AuthenticatedRequest;
    const res = createMockRes();
    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid.token.str" } } as AuthenticatedRequest;
    const res = createMockRes();
    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should populate req.user and call next() for valid Bearer token", () => {
    const token = signToken({ id: "user-1", userId: "user-1", email: "admin@agency.com", role: "ADMIN" });
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthenticatedRequest;
    const res = createMockRes();
    const next = vi.fn();

    authenticate(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user?.email).toBe("admin@agency.com");
    expect(next).toHaveBeenCalled();
  });

  it("should pass requireRole check when role is allowed", () => {
    const req = { user: { id: "1", userId: "1", email: "a@a.com", role: "ADMIN" } } as AuthenticatedRequest;
    const res = createMockRes();
    const next = vi.fn();

    const roleMiddleware = requireRole(["ADMIN"]);
    roleMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 403 when role is not allowed", () => {
    const req = { user: { id: "1", userId: "1", email: "a@a.com", role: "USER" } } as AuthenticatedRequest;
    const res = createMockRes();
    const next = vi.fn();

    const roleMiddleware = requireRole(["ADMIN"]);
    roleMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
