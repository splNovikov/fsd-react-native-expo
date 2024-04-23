import { useMemo } from 'react';
import { Tasks } from 'entities/task/task.types';

export const useTasksFilter = (tasks: Tasks, filter: string) => {
  const filteredTasks = useMemo(() => {
    return tasks?.filter(task => {
      if (filter === 'completed') {
        return task.completed;
      }
      if (filter === 'open') {
        return !task.completed;
      }

      return task;
    });
  }, [tasks, filter]);

  return {
    filteredTasks,
  };
};
