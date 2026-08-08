import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
};
