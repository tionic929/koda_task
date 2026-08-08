import { prisma } from "../lib/prisma.js";
import type { CreateProjectInput, UpdateProjectInput } from "../schemas/project.schema.js";

export class ProjectService {
  static async getAllProjects() {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getProjectById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
    });
  }

  static async createProject(data: CreateProjectInput) {
    return await prisma.project.create({
      data: {
        clientName: data.clientName,
        projectName: data.projectName,
        description: data.description ?? null,
        status: data.status,
        priority: data.priority,
        startDate: new Date(data.startDate),
        dueDate: new Date(data.dueDate),
      },
    });
  }

  static async updateProject(id: string, data: UpdateProjectInput) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }

    const updateData: Record<string, any> = {};
    if (data.clientName !== undefined) updateData.clientName = data.clientName;
    if (data.projectName !== undefined) updateData.projectName = data.projectName;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
    if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);

    return await prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  static async deleteProject(id: string) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }

    return await prisma.project.delete({
      where: { id },
    });
  }
}
