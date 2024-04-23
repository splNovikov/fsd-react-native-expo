import { z } from 'zod';

export const TaskDtoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TasksDtoSchema = z.array(TaskDtoSchema);

export const TaskSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TasksSchema = z.array(TaskSchema);
