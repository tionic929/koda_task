import { describe, it, expect, vi } from "vitest";
import { notFoundHandler, errorHandler } from "../error.middleware.js";
import type { Request, Response, NextFunction } from "express";

describe("Error Middleware", () => {
  it("should return 404 for unknown routes in notFoundHandler", () => {
    const req = { method: "GET", path: "/unknown" } as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);

    notFoundHandler(req, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Route not found: GET /unknown" });
  });

  it("should return 500 in errorHandler", () => {
    const err = new Error("Something went wrong");
    const req = {} as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    errorHandler(err, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong" });
  });
});
