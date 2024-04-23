import { z } from 'zod';
import {
  FilterQuerySchema,
  TaskDtoSchema,
  TaskSchema,
  TasksDtoSchema,
  TasksQueryDtoSchema,
  TasksSchema,
} from './task.contracts';

export type TaskDto = z.infer<typeof TaskDtoSchema>;
export type TasksDto = z.infer<typeof TasksDtoSchema>;
export type TasksQueryDto = z.infer<typeof TasksQueryDtoSchema>;
export type FilterQuery = z.infer<typeof FilterQuerySchema>;

export type Task = z.infer<typeof TaskSchema>;
export type Tasks = z.infer<typeof TasksSchema>;
