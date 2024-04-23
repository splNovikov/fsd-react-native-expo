import { StateCreator } from 'zustand';

export type State<Literals> = {
  tasksFilter: Literals;
};

export type Actions<Literals> = {
  changeTasksFilter: (tasksFilter: Literals) => void;
};

export type TasksFilterState<Literals> = State<Literals> & Actions<Literals>;
export const createTasksFilterSlice =
  <Literals>(
    initialState: State<Literals>,
  ): StateCreator<
    TasksFilterState<Literals>,
    [['zustand/devtools', never]],
    [],
    TasksFilterState<Literals>
  > =>
  set => ({
    ...initialState,
    changeTasksFilter: (tasksFilter: Literals) =>
      set({ tasksFilter }, false, 'changeTasksFilter'),
  });
