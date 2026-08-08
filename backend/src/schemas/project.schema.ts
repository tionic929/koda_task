import { z } from "zod";

export const ProjectStatusEnum = z.enum([
  "Planning",
  "In Progress",
  "On Hold",
  "Completed",
]);

export const ProjectPriorityEnum = z.enum(["Low", "Medium", "High"]);

export const createProjectSchema = z
  .object({
    clientName: z.string().trim().min(1, { message: "Client Name is required." }),
    projectName: z.string().trim().min(1, { message: "Project Name is required." }),
    description: z.string().trim().optional(),
    status: ProjectStatusEnum,
    priority: ProjectPriorityEnum,
    startDate: z.string().datetime({ message: "Start Date must be a valid ISO date." }),
    dueDate: z.string().datetime({ message: "Due Date must be a valid ISO date." }),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return start <= today;
    },
    {
      message: "Start Date cannot be in the future.",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      const due = new Date(data.dueDate);
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      return due >= todayStart;
    },
    {
      message: "Due Date cannot be in the past.",
      path: ["dueDate"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const due = new Date(data.dueDate);
      return due >= start;
    },
    {
      message: "Due Date cannot be earlier than Start Date.",
      path: ["dueDate"],
    }
  );

export const updateProjectSchema = z
  .object({
    clientName: z.string().trim().min(1, { message: "Client Name is required." }).optional(),
    projectName: z.string().trim().min(1, { message: "Project Name is required." }).optional(),
    description: z.string().trim().optional(),
    status: ProjectStatusEnum.optional(),
    priority: ProjectPriorityEnum.optional(),
    startDate: z.string().datetime({ message: "Start Date must be a valid ISO date." }).optional(),
    dueDate: z.string().datetime({ message: "Due Date must be a valid ISO date." }).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate) {
        const start = new Date(data.startDate);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return start <= today;
      }
      return true;
    },
    {
      message: "Start Date cannot be in the future.",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (data.dueDate) {
        const due = new Date(data.dueDate);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        return due >= todayStart;
      }
      return true;
    },
    {
      message: "Due Date cannot be in the past.",
      path: ["dueDate"],
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const due = new Date(data.dueDate);
        return due >= start;
      }
      return true;
    },
    {
      message: "Due Date cannot be earlier than Start Date.",
      path: ["dueDate"],
    }
  );

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
