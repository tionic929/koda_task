import React from "react";
import { Calendar, Edit2, Trash2, Building2 } from "lucide-react";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import type { Project } from "../../types/project.types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-indigo-600 font-medium">
              <Building2 className="w-3.5 h-3.5" />
              <span>{project.clientName}</span>
            </div>
            <h4 className="text-base font-semibold text-slate-900 mt-1">
              {project.projectName}
            </h4>
          </div>
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
          </div>
        </div>

        {project.description && (
          <p className="text-xs text-slate-600 line-clamp-2">
            {project.description}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {formatDate(project.startDate)} - {formatDate(project.dueDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(project)}
            aria-label="Edit project"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project)}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            aria-label="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
