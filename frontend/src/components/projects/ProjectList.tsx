import React from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../types/project.types";
import { RefreshCw, FolderOpen } from "lucide-react";

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  isFetching: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isLoading,
  isFetching,
  onEdit,
  onDelete,
}) => {
  // Initial loading state (no data available yet)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm animate-pulse space-y-4"
          >
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-5 bg-slate-200 rounded w-3/4"></div>
            <div className="h-10 bg-slate-100 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Background Refetch Indicator */}
      {isFetching && !isLoading && (
        <div className="flex items-center justify-end space-x-1.5 text-xs text-indigo-600 font-medium">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Updating data in background...</span>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-dashed border-slate-300 rounded-xl shadow-sm">
          <FolderOpen className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-900">
            No projects found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Get started by creating a new client project using the button above.
          </p>
        </div>
      ) : (
        /* Project Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
