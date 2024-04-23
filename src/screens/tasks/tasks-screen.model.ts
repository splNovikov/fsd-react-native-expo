import { createStore } from 'zustand';
import { DevtoolsOptions, devtools } from 'zustand/middleware';
import { tasksFilterModel } from 'shared/ui/tasks-filters';

type TasksFilter = 'all' | 'open' | 'completed';

const initialTaskFilterState: tasksFilterModel.State<TasksFilter> = {
  tasksFilter: 'all',
};
const tasksFilterStoreDevtoolsOptions: DevtoolsOptions = {
  name: 'TasksScreen TasksFilterStore',
};

export const tasksFilterStore = createStore<
  tasksFilterModel.TasksFilterState<TasksFilter>
>()(
  devtools(
    tasksFilterModel.createTasksFilterSlice<TasksFilter>(
      initialTaskFilterState,
    ),
    tasksFilterStoreDevtoolsOptions,
  ),
);

export const onTasksFilter = (tasksFilter: TasksFilter) => {
  tasksFilterStore.getState().changeTasksFilter(tasksFilter);
};
