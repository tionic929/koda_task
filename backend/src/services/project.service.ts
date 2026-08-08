import { prisma } from "../lib/prisma.js";
import type { CreateProjectInput, UpdateProjectInput } from "../schemas/project.schema.js";
import type { ProjectQueryParams } from "../schemas/projectQuery.schema.js";

const PRIORITY_ORDER: Record<string, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export class ProjectService {
  static async getAllProjects(params?: ProjectQueryParams) {
    const where: any = {};

    if (params) {
      const { search, status, priority } = params;

      if (search && typeof search === "string" && search.trim() !== "") {
        const searchTerm = search.trim();
        where.OR = [
          { projectName: { contains: searchTerm } },
          { clientName: { contains: searchTerm } },
        ];
      }

      if (status) {
        where.status = status;
      }

      if (priority) {
        where.priority = priority;
      }
    }

    const sortBy = params?.sortBy || "createdAt";
    const sortOrder = params?.sortOrder || "desc";
    const page = params?.page ? Math.max(1, Number(params.page)) : 1;
    const limit = params?.limit ? Math.max(1, Number(params.limit)) : 6;

    const orderBy: any = {};
    if (sortBy !== "priority") {
      orderBy[sortBy] = sortOrder;
    }

    let allMatching = await prisma.project.findMany({
      where,
      orderBy: sortBy !== "priority" ? orderBy : { createdAt: "desc" },
    });

    // In-memory case-insensitive search fallback for SQLite edge cases
    if (params?.search && params.search.trim() !== "") {
      const lowerSearch = params.search.trim().toLowerCase();
      allMatching = allMatching.filter(
        (p) =>
          p.projectName.toLowerCase().includes(lowerSearch) ||
          p.clientName.toLowerCase().includes(lowerSearch)
      );
    }

    // Custom business priority sorting (High -> Medium -> Low)
    if (sortBy === "priority") {
      allMatching.sort((a, b) => {
        const weightA = PRIORITY_ORDER[a.priority] ?? 99;
        const weightB = PRIORITY_ORDER[b.priority] ?? 99;
        if (sortOrder === "asc") {
          return weightA - weightB; // High (1) -> Medium (2) -> Low (3)
        } else {
          return weightB - weightA; // Low (3) -> Medium (2) -> High (1)
        }
      });
    }

    const total = allMatching.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedProjects = allMatching.slice(startIndex, startIndex + limit);

    return {
      data: paginatedProjects,
      total,
      page,
      totalPages,
      limit,
    };
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
