import { api } from "../lib/axios";
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectQueryParams,
  PaginatedResponse,
} from "../types/project.types";

export class ProjectService {
  static async getAllProjects(params?: ProjectQueryParams): Promise<PaginatedResponse<Project>> {
    const cleanParams: Record<string, string | number> = {};
    if (params) {
      if (params.search && params.search.trim() !== "") {
        cleanParams.search = params.search.trim();
      }
      if (params.status) {
        cleanParams.status = params.status;
      }
      if (params.priority) {
        cleanParams.priority = params.priority;
      }
      if (params.sortBy) {
        cleanParams.sortBy = params.sortBy;
      }
      if (params.sortOrder) {
        cleanParams.sortOrder = params.sortOrder;
      }
      if (params.page) {
        cleanParams.page = params.page;
      }
      if (params.limit) {
        cleanParams.limit = params.limit;
      }
    }
    const response = await api.get<PaginatedResponse<Project>>("/projects", { params: cleanParams });
    return response.data;
  }

  static async getProjectById(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  }

  static async createProject(data: CreateProjectInput): Promise<Project> {
    const response = await api.post<Project>("/projects", data);
    return response.data;
  }

  static async updateProject(id: string, data: UpdateProjectInput): Promise<Project> {
    const response = await api.put<Project>(`/projects/${id}`, data);
    return response.data;
  }

  static async deleteProject(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/projects/${id}`);
    return response.data;
  }
}
