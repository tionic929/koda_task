import { describe, it, expect } from "vitest";
import { createProjectSchema, updateProjectSchema } from "../project.schema.js";

describe("Project Schema Validation", () => {
  const futureStart = new Date(Date.now() + 86400000).toISOString();
  const futureDue = new Date(Date.now() + 172800000).toISOString();

  it("should validate a valid project creation payload", () => {
    const validPayload = {
      clientName: "Acme Corp",
      projectName: "Portal Redesign",
      description: "Full overhaul",
      status: "Planning",
      priority: "High",
      startDate: futureStart,
      dueDate: futureDue,
    };

    const result = createProjectSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("should reject project creation if dueDate is earlier than startDate", () => {
    const invalidPayload = {
      clientName: "Acme Corp",
      projectName: "Portal Redesign",
      status: "Planning",
      priority: "High",
      startDate: futureDue,
      dueDate: futureStart,
    };

    const result = createProjectSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should reject project creation if startDate is in the past", () => {
    const pastDate = new Date("2020-01-01T00:00:00.000Z").toISOString();
    const invalidPayload = {
      clientName: "Acme Corp",
      projectName: "Portal Redesign",
      status: "Planning",
      priority: "High",
      startDate: pastDate,
      dueDate: futureDue,
    };

    const result = createProjectSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should validate partial update payload in updateProjectSchema", () => {
    const updatePayload = {
      status: "In Progress",
      priority: "Medium",
    };

    const result = updateProjectSchema.safeParse(updatePayload);
    expect(result.success).toBe(true);
  });
});
