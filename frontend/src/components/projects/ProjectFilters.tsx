import React from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import type {
  ProjectStatus,
  ProjectPriority,
  ProjectQueryParams,
} from "../../types/project.types";

interface ProjectFiltersProps {
  filters: ProjectQueryParams;
  onFilterChange: (newFilters: Partial<ProjectQueryParams>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const isFilterActive =
    Boolean(filters.search && filters.search.trim() !== "") ||
    Boolean(filters.status) ||
    Boolean(filters.priority) ||
    Boolean(filters.sortBy && filters.sortBy !== "createdAt") ||
    Boolean(filters.sortOrder && filters.sortOrder !== "desc");

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
      {/* Top Filter Controls Row (Fixed Height / No Layout Shifts) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Search by client or project name..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: "", page: 1 })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-slate-200/50 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={filters.status || ""}
              onChange={(e) =>
                onFilterChange({
                  status: e.target.value as ProjectStatus | "",
                  page: 1,
                })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="min-w-[140px]">
            <select
              value={filters.priority || ""}
              onChange={(e) =>
                onFilterChange({
                  priority: e.target.value as ProjectPriority | "",
                  page: 1,
                })
              }
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5 min-w-[180px]">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={`${filters.sortBy || "createdAt"}-${filters.sortOrder || "desc"}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-") as [
                  ProjectQueryParams["sortBy"],
                  ProjectQueryParams["sortOrder"],
                ];
                onFilterChange({ sortBy, sortOrder, page: 1 });
              }}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
              <option value="startDate-asc">Start Date (Earliest)</option>
              <option value="projectName-asc">Project Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar with Clear Filters Button */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100 min-h-[36px]">
        <div className="flex items-center space-x-2">
          <span>
            Total <span className="font-semibold text-slate-900">{totalCount}</span>{" "}
            {totalCount === 1 ? "project" : "projects"} found
          </span>
          {isFilterActive && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              Filtered results
            </span>
          )}
        </div>

        {/* Clear Filters Button positioned cleanly next to summary info */}
        {isFilterActive && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
