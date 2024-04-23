import { queryOptions as tsqQueryOptions } from '@tanstack/react-query';
// import { StoreApi } from 'zustand';
import { queryClient } from 'shared/lib/react-query';
import { tasksQuery } from './task.api';
import { FilterQuery, Task, Tasks } from './task.types';

const keys = {
  root: () => ['task'],
  task: (slug: string | number) => [...keys.root(), 'bySlug', slug],
  query: () => [...keys.root(), 'query'],
  queryByFilter: (filter: FilterQuery) => [...keys.query(), 'byFilter', filter],
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
  queryKey: (filterQuery: FilterQuery) => keys.queryByFilter(filterQuery),

  getCache: (filterQuery: FilterQuery) =>
    queryClient.getQueryData<Tasks>(tasksService.queryKey(filterQuery)),

  queryOptions: () => {
    const pageQuery = { offset: 0, limit: 10 };
    const filterQuery = {};
    const tasksKey = tasksService.queryKey(filterQuery);

    return tsqQueryOptions({
      queryKey: tasksKey,
      queryFn: async ({ signal }) => {
        const tasks = await tasksQuery({ query: { ...pageQuery } }, signal);

        tasks.forEach(task => {
          taskService.setCache(task);
        });

        return tasks;
      },
      initialData: () => tasksService.getCache(filterQuery)!,
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(tasksKey)?.dataUpdatedAt,
    });
  },
};
