import { z } from "zod";
import { ProjectStatusEnum, ProjectPriorityEnum } from "./project.schema.js";

export const projectQuerySchema = z.object({
  search: z.string().optional(),
  status: z.union([ProjectStatusEnum, z.literal("")]).optional(),
  priority: z.union([ProjectPriorityEnum, z.literal("")]).optional(),
  sortBy: z
    .enum(["dueDate", "startDate", "projectName", "priority", "createdAt"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(6),
});

export type ProjectQueryParams = {
  search?: string | undefined;
  status?: z.infer<typeof ProjectStatusEnum> | "" | undefined;
  priority?: z.infer<typeof ProjectPriorityEnum> | "" | undefined;
  sortBy?: "dueDate" | "startDate" | "projectName" | "priority" | "createdAt" | undefined;
  sortOrder?: "asc" | "desc" | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};
