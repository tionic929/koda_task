import type { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service.js";

export class ProjectController {
  static async getAllProjects(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await ProjectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      const project = await ProjectService.getProjectById(id);

      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      const updated = await ProjectService.updateProject(id, req.body);

      if (!updated) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== "string") {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      const deleted = await ProjectService.deleteProject(id);

      if (!deleted) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
