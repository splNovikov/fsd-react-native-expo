import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenProps } from 'shared/lib/router';
import { useStore } from 'zustand';
import { tasksFilterStore, onTasksFilter } from './tasks-screen.model';
import { TasksFilters } from 'shared/ui/tasks-filters';
import { TasksList } from 'widgets/tasks-list';

export const TasksScreen: FC<ScreenProps<'Tasks'>> = () => {
  const tasksFilter = useStore(tasksFilterStore, state => state.tasksFilter);

  return (
    <SafeAreaView className="flex-1">
      <TasksFilters onTasksFilter={onTasksFilter} />
      <TasksList tasksFilter={tasksFilter} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
