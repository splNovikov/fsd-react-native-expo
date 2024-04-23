import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';
// import { StoreApi } from 'zustand';
import { queryClient } from 'shared/lib/react-query';
import { tasksQuery } from './task.api';
import { Task, Tasks } from './task.types';

const keys = {
  root: () => ['task'],
  task: (slug: string | number) => [...keys.root(), 'bySlug', slug],
  query: () => [...keys.root(), 'query'],
};

export const taskService = {
  queryKey: (slug: string | number) => keys.task(slug),

  getCache: (slug: string) =>
    queryClient.getQueryData<Task>(taskService.queryKey(slug)),

  setCache: (task: Task) =>
    queryClient.setQueryData(taskService.queryKey(task.id), task),

  removeCache: (slug: string) =>
    queryClient.removeQueries({ queryKey: taskService.queryKey(slug) }),
};

export const tasksService = {
  queryKey: () => keys.query(),

  getCache: () => queryClient.getQueryData<Tasks>(tasksService.queryKey()),

  queryOptions: () => {
    const tasksKey = tasksService.queryKey();

    return tsqQueryOptions({
      queryKey: tasksKey,
      queryFn: async ({ signal }) => {
        const tasks = await tasksQuery(signal);

        tasks.forEach(task => {
          taskService.setCache(task);
        });

        return tasks;
      },
      initialData: () => tasksService.getCache()!,
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(tasksKey)?.dataUpdatedAt,
    });
  },
};
