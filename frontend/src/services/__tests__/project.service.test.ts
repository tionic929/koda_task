import { describe, it, expect, vi } from "vitest";
import { ProjectService } from "../project.service.js";
import api from "../../lib/axios.js";

describe("Frontend Project Service", () => {
  it("should fetch all projects with cleaned query parameters", async () => {
    const mockResponse = {
      data: [{ id: "p-1", projectName: "Website Redesign" }],
      total: 1,
      page: 1,
      totalPages: 1,
      limit: 6,
    };

    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockResponse } as any);

    const result = await ProjectService.getAllProjects({
      search: " Website ",
      status: "Planning",
      page: 1,
    });

    expect(api.get).toHaveBeenCalledWith("/projects", {
      params: { search: "Website", status: "Planning", page: 1 },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should create project via API", async () => {
    const mockCreated = { id: "p-2", projectName: "Mobile App" };
    vi.spyOn(api, "post").mockResolvedValueOnce({ data: mockCreated } as any);

    const newProjectData = {
      clientName: "Acme",
      projectName: "Mobile App",
      status: "Planning" as const,
      priority: "High" as const,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    };

    const result = await ProjectService.createProject(newProjectData);
    expect(api.post).toHaveBeenCalledWith("/projects", newProjectData);
    expect(result).toEqual(mockCreated);
  });

  it("should delete project via API", async () => {
    const mockMessage = { message: "Project deleted successfully" };
    vi.spyOn(api, "delete").mockResolvedValueOnce({ data: mockMessage } as any);

    const result = await ProjectService.deleteProject("p-1");
    expect(api.delete).toHaveBeenCalledWith("/projects/p-1");
    expect(result).toEqual(mockMessage);
  });
});
