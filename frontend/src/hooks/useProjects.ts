import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "../services/project.service";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  ApiErrorResponse,
} from "../types/project.types";
import { AxiosError } from "axios";

export const PROJECTS_QUERY_KEY = ["projects"];

export function useProjects() {
  const query = useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: () => ProjectService.getAllProjects(),
  });

  return {
    projects: query.data ?? [],
    // isLoading: true only during initial data fetch (no cached data yet)
    isLoading: query.isLoading,
    // isFetching: true whenever a network request is in flight (including background revalidation)
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
      // Invalidate to trigger clean background refetch without UI flickering
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
