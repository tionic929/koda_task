export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed";

export type ProjectPriority = "Low" | "Medium" | "High";

export interface Project {
  id: string;
  clientName: string;
  projectName: string;
  description?: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  clientName: string;
  projectName: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  dueDate: string;
}

export interface UpdateProjectInput {
  clientName?: string;
  projectName?: string;
  description?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  startDate?: string;
  dueDate?: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: string[];
}
