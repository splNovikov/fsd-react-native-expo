import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TasksListWidget } from 'widgets/tasks-list';
import { TasksFilters } from 'features';
import { ScreenProps } from 'shared/lib/router';

export const TasksScreen: FC<ScreenProps<'Tasks'>> = () => {
  return (
    <SafeAreaView>
      <TasksFilters />
      <TasksListWidget />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
