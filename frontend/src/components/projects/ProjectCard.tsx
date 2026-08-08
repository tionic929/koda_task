import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Building2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import type { Project } from "../../types/project.types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 pr-6">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate max-w-[180px]">{project.clientName}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
            {project.projectName}
          </h3>
        </div>

        {/* 3-Dot Colon Action Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="More actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* High Z-Index Popover Menu (z-[100]) */}
          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-40 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-[100] animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(project);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                <span>Edit Project</span>
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(project);
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Delete Project</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      )}

      {/* Badges Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>

      {/* Dates & Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {formatDate(project.startDate)} &ndash; {formatDate(project.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
};
