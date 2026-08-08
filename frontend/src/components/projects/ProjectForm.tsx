import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { projectFormSchema, type ProjectFormData } from "./ProjectFormSchema";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import type { Project, CreateProjectInput } from "../../types/project.types";

interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (data: CreateProjectInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  apiError?: string | null;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  apiError,
}) => {
  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      clientName: initialData?.clientName || "",
      projectName: initialData?.projectName || "",
      description: initialData?.description || "",
      status: initialData?.status || "Planning",
      priority: initialData?.priority || "Medium",
      startDate: formatDateForInput(initialData?.startDate) || new Date().toISOString().split("T")[0],
      dueDate: formatDateForInput(initialData?.dueDate) || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    },
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (data: ProjectFormData) => {
    setFormError(null);

    // Validate with Zod
    const validationResult = projectFormSchema.safeParse(data);
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ProjectFormData;
        if (fieldName) {
          setError(fieldName, { message: issue.message });
        }
      });
      return;
    }

    try {
      const formattedData: CreateProjectInput = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        dueDate: new Date(data.dueDate).toISOString(),
      };
      await onSubmit(formattedData);
    } catch (err: any) {
      setFormError(err?.message || "Failed to save project.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
      {(formError || apiError) && (
        <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
          {formError || apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Client Name *"
          placeholder="e.g. Acme Corporation"
          error={errors.clientName?.message}
          {...register("clientName")}
        />

        <Input
          label="Project Name *"
          placeholder="e.g. E-Commerce Redesign"
          error={errors.projectName?.message}
          {...register("projectName")}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Brief summary of project scope..."
          className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder-slate-400"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Status *"
          options={[
            { label: "Planning", value: "Planning" },
            { label: "In Progress", value: "In Progress" },
            { label: "On Hold", value: "On Hold" },
            { label: "Completed", value: "Completed" },
          ]}
          error={errors.status?.message}
          {...register("status")}
        />

        <Select
          label="Priority *"
          options={[
            { label: "Low", value: "Low" },
            { label: "Medium", value: "Medium" },
            { label: "High", value: "High" },
          ]}
          error={errors.priority?.message}
          {...register("priority")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date *"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        <Input
          type="date"
          label="Due Date *"
          error={errors.dueDate?.message}
          {...register("dueDate")}
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
};
