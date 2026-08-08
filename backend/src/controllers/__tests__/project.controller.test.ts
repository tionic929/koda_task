import { describe, it, expect, vi } from "vitest";
import { ProjectController } from "../project.controller.js";
import { ProjectService } from "../../services/project.service.js";
import type { Request, Response, NextFunction } from "express";

describe("Project Controller", () => {
  it("should handle getAllProjects and return 200 with query parameters", async () => {
    const mockResult = {
      data: [],
      total: 0,
      page: 1,
      totalPages: 1,
      limit: 6,
    };
    vi.spyOn(ProjectService, "getAllProjects").mockResolvedValueOnce(mockResult);

    const req = { query: {} } as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    await ProjectController.getAllProjects(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return 404 in getProjectById if project is not found", async () => {
    vi.spyOn(ProjectService, "getProjectById").mockResolvedValueOnce(null);

    const req = { params: { id: "nonexistent-id" } } as any;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    await ProjectController.getProjectById(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should create project and return 201 status", async () => {
    const mockProject = { id: "p-1", projectName: "New Web App" };
    vi.spyOn(ProjectService, "createProject").mockResolvedValueOnce(mockProject as any);

    const req = { body: { projectName: "New Web App" } } as Request;
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    const next = vi.fn() as NextFunction;

    await ProjectController.createProject(req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProject);
  });
});
