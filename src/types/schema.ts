import z from "zod";

// ============================================================================
// TASK SCHEMAS
// ============================================================================

/**
 * Task Status Enum
 */
export const TaskStatusEnum = z.enum(["PENDING", "COMPLETED"]);

/**
 * Task Priority Enum
 */
export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

/**
 * Task Create Schema
 */
export const createTaskFormSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  status: TaskStatusEnum.optional(),
  priority: TaskPriorityEnum.optional(),
  dueDate: z.date().optional(),
});

/**
 * Task Update Schema
 */
export const updateTaskFormSchema = z.object({
  title: z.string().min(1, "Task title is required").optional(),
  description: z.string().optional(),
  status: TaskStatusEnum.optional(),
  priority: TaskPriorityEnum.optional(),
  dueDate: z.date().optional(),
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Task Types
export type CreateTaskFormData = z.infer<typeof createTaskFormSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskFormSchema>;
export type TaskFormData = CreateTaskFormData | UpdateTaskFormData;
