import { z } from "zod";

const isBeforeToday = (dateStr: string) => {
  if (!dateStr) return false;
  const dateObj = new Date(dateStr);
  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj < todayObj;
};

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
    startDate: z
      .string()
      .min(1, { message: "Start Date is required." })
      .refine((val) => !isBeforeToday(val), {
        message: "Start Date cannot be in the past.",
      }),
    dueDate: z.string().min(1, { message: "Due Date is required." }),
  })
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
