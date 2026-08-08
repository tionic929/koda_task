import { z } from "zod";

export const projectFormSchema = z
  .object({
    clientName: z.string().trim().min(1, { message: "Client Name is required." }),
    projectName: z.string().trim().min(1, { message: "Project Name is required." }),
    description: z.string().trim().optional(),
    status: z.enum(["Planning", "In Progress", "On Hold", "Completed"], {
      message: "Status must be valid.",
    }),
    priority: z.enum(["Low", "Medium", "High"], {
      message: "Priority must be valid.",
    }),
    startDate: z.string().min(1, { message: "Start Date is required." }),
    dueDate: z.string().min(1, { message: "Due Date is required." }),
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

export type ProjectFormData = z.infer<typeof projectFormSchema>;
