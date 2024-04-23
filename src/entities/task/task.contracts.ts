import { z } from 'zod';

export const TaskDtoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TasksDtoSchema = z.array(TaskDtoSchema);

export const PageQueryDtoSchema = z.object({
  offset: z.number().min(0),
  limit: z.number().min(1),
});

// todo (pavel) filters:
// export const FilterQueryDtoSchema = z.object({
//   tag: z.string().optional(),
//   author: z.string().optional(),
//   favorited: z.string().optional(),
// });
export const FilterQueryDtoSchema = z.object({});

export const TasksQueryDtoSchema = z.intersection(
  PageQueryDtoSchema,
  FilterQueryDtoSchema,
);

export const FilterQuerySchema = z.object({
  favorited: z.string().optional(),
});

export const TaskSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const TasksSchema = z.array(TaskSchema);
