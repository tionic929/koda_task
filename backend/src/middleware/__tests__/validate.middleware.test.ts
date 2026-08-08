import { describe, it, expect, vi } from "vitest";
import { validateBody } from "../validate.middleware.js";
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const dummySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

describe("Validate Middleware", () => {
  it("should parse body and call next() on valid input", async () => {
    const req = { body: { name: "Test Name" } } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    const middleware = validateBody(dummySchema);
    await middleware(req, res, next);

    expect(req.body.name).toBe("Test Name");
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 with validation details on Zod error", async () => {
    const req = { body: { name: "" } } as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    const middleware = validateBody(dummySchema);
    await middleware(req as Response & Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validation failed",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
