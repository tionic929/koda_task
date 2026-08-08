import React from "react";
import type { ProjectStatus, ProjectPriority } from "../../types/project.types";

interface StatusBadgeProps {
  status: ProjectStatus;
}

interface PriorityBadgeProps {
  priority: ProjectPriority;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case "Planning":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "In Progress":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "On Hold":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}
    >
      {status}
    </span>
  );
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getBadgeStyle = () => {
    switch (priority) {
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Medium":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}
    >
      {priority}
    </span>
  );
};
