import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { TasksListWidget } from 'widgets/tasks-list';
import { ScreenProps } from 'shared/lib/router';
import { useStore } from 'zustand';
import { tasksFilterStore } from './tasks-screen.model';
import { TasksFilters } from 'shared/ui/tasks-filter';

export const TasksScreen: FC<ScreenProps<'Tasks'>> = () => {
  const tasksFilter = useStore(tasksFilterStore, state => state.tasksFilter);

  return (
    <SafeAreaView className="flex-1">
      <TasksFilters />
      <TasksListWidget tasksFilter={tasksFilter} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
