import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { SafeAreaView } from 'react-native';
import { TasksListWidget } from 'widgets/tasks-list';
import { TasksFilters } from 'features';
import { ScreenProps } from 'shared/lib/router';

export const TasksScreen: FC<ScreenProps<'Tasks'>> = () => {
  return (
    <SafeAreaView className="flex-1">
      <TasksFilters />
      <TasksListWidget />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
