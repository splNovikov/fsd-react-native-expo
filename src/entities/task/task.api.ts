import { TasksDtoSchema } from 'entities/task/task.contracts';
import { mapTasks } from 'entities/task/task.lib';
import { baseUrl } from 'shared/api/copilot';
import { createJsonQuery } from 'shared/lib/fetch';
import { zodContract } from 'shared/lib/zod';
import type { TasksQueryDto } from './task.types';

export async function tasksQuery(
  params: { query: TasksQueryDto },
  signal?: AbortSignal,
) {
  return createJsonQuery({
    request: {
      url: baseUrl('todos'),
      method: 'GET',
      // todo (pavel) headers
      // headers: { ...sessionModel.authorizationHeader() },
      query: params.query,
    },
    response: {
      contract: zodContract(TasksDtoSchema),
      mapData: mapTasks,
    },
    abort: signal,
  });
}
