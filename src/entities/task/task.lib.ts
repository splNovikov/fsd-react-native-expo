import type { Task, TaskDto, Tasks, TasksDto } from './task.types';

export function mapTask(taskDto: TaskDto): Task {
  return { ...taskDto };
}

export function mapTasks(tasksDto: TasksDto): Tasks {
  return tasksDto.map(mapTask);
}
