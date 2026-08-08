import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "../jwt.js";

describe("JWT Utility", () => {
  it("should sign and verify a valid JWT token", () => {
    const payload = {
      id: "user-123",
      userId: "user-123",
      email: "test@agency.com",
      role: "ADMIN",
    };

    const token = signToken(payload);
    expect(typeof token).toBe("string");

    const decoded = verifyToken(token);
    expect(decoded.id).toBe("user-123");
    expect(decoded.email).toBe("test@agency.com");
    expect(decoded.role).toBe("ADMIN");
  });

  it("should handle payload with only id or userId", () => {
    const token = signToken({ id: "user-456", email: "user@agency.com", role: "ADMIN" });
    const decoded = verifyToken(token);
    expect(decoded.id).toBe("user-456");
    expect(decoded.userId).toBe("user-456");
  });

  it("should throw an error for invalid token verification", () => {
    expect(() => verifyToken("invalid-token-string")).toThrow();
  });
});
