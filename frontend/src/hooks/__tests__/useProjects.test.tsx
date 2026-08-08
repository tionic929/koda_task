import { describe, it, expect } from "vitest";
import { getErrorMessage } from "../useProjects";
import { AxiosError } from "axios";

describe("useProjects helper functions", () => {
  it("extracts error message from AxiosError with details array", () => {
    const axiosError = new AxiosError("Request failed");
    axiosError.response = {
      data: { error: "Validation failed", details: ["Name is required.", "Date invalid."] },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {} as any,
    };

    const message = getErrorMessage(axiosError);
    expect(message).toBe("Name is required. Date invalid.");
  });

  it("extracts error message from simple Error object", () => {
    const standardError = new Error("Network connection dropped");
    const message = getErrorMessage(standardError);
    expect(message).toBe("Network connection dropped");
  });

  it("returns fallback message for unknown error types", () => {
    const message = getErrorMessage(null);
    expect(message).toBe("An unexpected error occurred.");
  });
});
