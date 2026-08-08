import { describe, it, expect } from "vitest";
import { loginSchema } from "../auth.schema.js";

describe("Auth Schema Validation", () => {
  it("should validate correct login payload", () => {
    const validData = {
      email: "admin@agency.com",
      password: "password123",
    };

    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation for invalid email format", () => {
    const invalidData = {
      email: "invalid-email-format",
      password: "password123",
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should fail validation for empty password", () => {
    const invalidData = {
      email: "admin@agency.com",
      password: "",
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
