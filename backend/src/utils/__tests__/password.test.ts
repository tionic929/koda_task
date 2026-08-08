import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword } from "../password.js";

describe("Password Utility", () => {
  it("should hash a password and verify matching password successfully", async () => {
    const plainPassword = "securePassword123";
    const hashed = await hashPassword(plainPassword);

    expect(hashed).not.toBe(plainPassword);
    expect(hashed.length).toBeGreaterThan(20);

    const isMatch = await comparePassword(plainPassword, hashed);
    expect(isMatch).toBe(true);
  });

  it("should return false for incorrect password comparison", async () => {
    const plainPassword = "securePassword123";
    const wrongPassword = "wrongPassword123";
    const hashed = await hashPassword(plainPassword);

    const isMatch = await comparePassword(wrongPassword, hashed);
    expect(isMatch).toBe(false);
  });
});
