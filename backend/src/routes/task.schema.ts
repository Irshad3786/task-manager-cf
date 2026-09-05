import { z } from "zod";

export const taskStatusSchema = z.enum([
  "todo",
  "in-progress",
  "done",
]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  dueDate: z.number().int().positive().optional(),
});