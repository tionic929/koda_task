import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project.service";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectQueryParams,
  ApiErrorResponse,
} from "../types/project.types";
import { AxiosError } from "axios";

export const PROJECTS_QUERY_KEY = ["projects"];

export function useProjects(params?: ProjectQueryParams) {
  const query = useQuery({
    queryKey: [
      ...PROJECTS_QUERY_KEY,
      params?.search || "",
      params?.status || "",
      params?.priority || "",
      params?.sortBy || "createdAt",
      params?.sortOrder || "desc",
      params?.page || 1,
      params?.limit || 6,
    ],
    queryFn: () => ProjectService.getAllProjects(params),
  });

  return {
    projects: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    totalPages: query.data?.totalPages ?? 1,
    limit: query.data?.limit ?? 6,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useProjectDetails(id: string | null) {
  const query = useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: () => (id ? ProjectService.getProjectById(id) : null),
    enabled: Boolean(id),
  });

  return {
    project: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectInput) => ProjectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
      ProjectService.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PROJECTS_QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProjectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiErrorResponse;
    if (data.details && data.details.length > 0) {
      return data.details.join(" ");
    }
    if (data.error) {
      return data.error;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
}
