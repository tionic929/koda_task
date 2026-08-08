import { describe, it, expect } from "vitest";
import { projectQuerySchema } from "../projectQuery.schema.js";

describe("Project Query Schema Validation", () => {
  it("should apply default values for page and limit", () => {
    const parsed = projectQuerySchema.parse({});
    expect(parsed.page).toBe(1);
    expect(parsed.limit).toBe(6);
  });

  it("should coerce string page and limit parameters to numbers", () => {
    const parsed = projectQuerySchema.parse({ page: "2", limit: "10" });
    expect(parsed.page).toBe(2);
    expect(parsed.limit).toBe(10);
  });

  it("should validate search, status, and priority query filters", () => {
    const parsed = projectQuerySchema.parse({
      search: "Acme",
      status: "Planning",
      priority: "High",
      sortBy: "dueDate",
      sortOrder: "asc",
    });

    expect(parsed.search).toBe("Acme");
    expect(parsed.status).toBe("Planning");
    expect(parsed.priority).toBe("High");
    expect(parsed.sortBy).toBe("dueDate");
    expect(parsed.sortOrder).toBe("asc");
  });

  it("should allow empty string for status and priority filters", () => {
    const parsed = projectQuerySchema.parse({ status: "", priority: "" });
    expect(parsed.status).toBe("");
    expect(parsed.priority).toBe("");
  });
});
