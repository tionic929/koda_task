import { api } from "../lib/axios";
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "../types/project.types";

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>("/projects");
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
