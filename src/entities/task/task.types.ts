import { z } from 'zod';
import {
  TaskDtoSchema,
  TaskSchema,
  TasksDtoSchema,
  TasksSchema,
} from './task.contracts';

export type TaskDto = z.infer<typeof TaskDtoSchema>;
export type TasksDto = z.infer<typeof TasksDtoSchema>;

export type Task = z.infer<typeof TaskSchema>;
export type Tasks = z.infer<typeof TasksSchema>;
