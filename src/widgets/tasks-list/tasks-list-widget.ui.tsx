import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';
import { taskQueries } from 'entities/task';
import { Empty } from 'shared/ui/empty';
import { Loading } from 'shared/ui/loading';
import { TaskRow } from './task-row';

export const TasksListWidget = () => {
  const { data, isLoading } = useQuery(taskQueries.tasksService.queryOptions());

  // const filteredTasks = taskModel.selectors.getFilteredTasks();

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.container}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <TaskRow data={item} />}
      ListEmptyComponent={<Empty desc="No tasks found" />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingVertical: 16,
    backgroundColor: 'fff',
  },
});
