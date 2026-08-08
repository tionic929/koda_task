import { describe, it, expect } from "vitest";
import { ProjectService } from "./project.service.js";

describe("ProjectService - Discovery & Query Tests", () => {
  it("should fetch all projects when no parameters are provided", async () => {
    const result = await ProjectService.getAllProjects();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.total).toBeGreaterThan(0);
    expect(result.data.length).toBeLessThanOrEqual(6); // Limit 6 per page
  });

  it("should search projects case-insensitively by client name or project name", async () => {
    const result = await ProjectService.getAllProjects({ search: "acme" });
    expect(result.total).toBeGreaterThan(0);
    result.data.forEach((p) => {
      const match =
        p.clientName.toLowerCase().includes("acme") ||
        p.projectName.toLowerCase().includes("acme");
      expect(match).toBe(true);
    });
  });

  it("should filter projects by exact status", async () => {
    const result = await ProjectService.getAllProjects({ status: "Planning" });
    expect(result.total).toBeGreaterThan(0);
    result.data.forEach((p) => {
      expect(p.status).toBe("Planning");
    });
  });

  it("should filter projects by exact priority", async () => {
    const result = await ProjectService.getAllProjects({ priority: "High" });
    expect(result.total).toBeGreaterThan(0);
    result.data.forEach((p) => {
      expect(p.priority).toBe("High");
    });
  });

  it("should sort projects by priority order (High -> Medium -> Low) when ascending", async () => {
    const result = await ProjectService.getAllProjects({
      sortBy: "priority",
      sortOrder: "asc",
      limit: 50,
    });
    expect(result.data.length).toBeGreaterThan(0);

    const priorityWeights: Record<string, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    for (let i = 0; i < result.data.length - 1; i++) {
      const currentWeight = priorityWeights[result.data[i]!.priority] ?? 99;
      const nextWeight = priorityWeights[result.data[i + 1]!.priority] ?? 99;
      expect(currentWeight).toBeLessThanOrEqual(nextWeight);
    }
  });

  it("should sort projects by due date in ascending order", async () => {
    const result = await ProjectService.getAllProjects({
      sortBy: "dueDate",
      sortOrder: "asc",
      limit: 50,
    });
    expect(result.data.length).toBeGreaterThan(0);

    for (let i = 0; i < result.data.length - 1; i++) {
      const currentDue = new Date(result.data[i]!.dueDate).getTime();
      const nextDue = new Date(result.data[i + 1]!.dueDate).getTime();
      expect(currentDue).toBeLessThanOrEqual(nextDue);
    }
  });
});
