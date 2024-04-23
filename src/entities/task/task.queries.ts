import {
  infiniteQueryOptions,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';
// import { StoreApi } from 'zustand';
// eslint-disable-next-line no-restricted-imports
import { queryClient } from 'shared/lib/react-query';
import { tasksQuery } from './task.api';
// import { State } from './task.model';
import { FilterQuery, Task, Tasks } from './task.types';

const keys = {
  root: () => ['article'],
  task: (slug: string | number) => [...keys.root(), 'bySlug', slug],
  query: () => [...keys.root(), 'query'],
  queryByFilter: (filter: FilterQuery) => [...keys.query(), 'byFilter', filter],
  infinityQuery: () => [...keys.root(), 'infinityQuery'],
  infinityQueryByFilter: (filter: FilterQuery) => [
    ...keys.infinityQuery(),
    'byFilter',
    filter,
  ],
};

export const taskService = {
  queryKey: (slug: string | number) => keys.task(slug),

  getCache: (slug: string) =>
    queryClient.getQueryData<Task>(taskService.queryKey(slug)),

  setCache: (task: Task) =>
    queryClient.setQueryData(taskService.queryKey(task.id), task),
  // todo: slug
  // queryClient.setQueryData(taskService.queryKey(task.slug), task),

  removeCache: (slug: string) =>
    queryClient.removeQueries({ queryKey: taskService.queryKey(slug) }),

  // prefetchQuery: async (slug: string) =>
  //   queryClient.prefetchQuery(articleService.queryOptions(slug)),
  //
  // ensureQueryData: async (slug: string) =>
  //   queryClient.ensureQueryData(articleService.queryOptions(slug)),
};

export const tasksService = {
  queryKey: (filterQuery: FilterQuery) => keys.queryByFilter(filterQuery),

  getCache: (filterQuery: FilterQuery) =>
    queryClient.getQueryData<Tasks>(tasksService.queryKey(filterQuery)),

  queryOptions: () => {
    const pageQuery = { offset: 0, limit: 10 };
    const filterQuery = {};
    const tasksKey = infinityTasksService.queryKey(filterQuery);

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

  // prefetchQuery: async (slug: string) =>
  //   queryClient.prefetchQuery(articleService.queryOptions(slug)),
  //
  // ensureQueryData: async (slug: string) =>
  //   queryClient.ensureQueryData(articleService.queryOptions(slug)),
};

export const infinityTasksService = {
  queryKey: (filterQuery: FilterQuery) =>
    keys.infinityQueryByFilter(filterQuery),

  getCache: (filterQuery: FilterQuery) =>
    // todo (pavel) <InfiniteData<Tasks>>
    queryClient.getQueryData(infinityTasksService.queryKey(filterQuery)),

  // todo (pavel) add zustand
  // queryOptions: (filterStore: StoreApi<State>) => {
  queryOptions: () => {
    const pageQuery = { offset: 0, limit: 10 };
    const filterQuery = {};
    // const { pageQuery, filterQuery = {} } = filterStore.getState();
    // const { following, ...filterQueryDto } = filterQuery;
    // const isUserFeed = Boolean(following);

    return infiniteQueryOptions({
      // todo (pavel)
      queryKey: infinityTasksService.queryKey(filterQuery),
      queryFn: async ({ pageParam, signal }) => {
        const tasks = await tasksQuery({ query: { ...pageParam } }, signal);

        tasks.forEach(task => {
          taskService.setCache(task);
        });

        return tasks;
      },
      initialPageParam: pageQuery as any,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        // todo (pavel)
        // @ts-ignore
        if (lastPage.length < lastPageParam.limit || !lastPage.length) {
          return null;
        }
        return {
          limit: lastPageParam.limit,
          offset: allPages.length * lastPageParam.limit,
        };
      },
      initialData: () => infinityTasksService.getCache(filterQuery)!,
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(infinityTasksService.queryKey(filterQuery))
          ?.dataUpdatedAt,
    });
  },

  prefetchQuery: async (filterStore: StoreApi<State>) =>
    queryClient.prefetchInfiniteQuery(
      infinityTasksService.queryOptions(filterStore),
    ),

  cancelQuery: (filterQuery: FilterQuery) =>
    queryClient.cancelQueries({
      queryKey: infinityTasksService.queryKey(filterQuery),
    }),
};
