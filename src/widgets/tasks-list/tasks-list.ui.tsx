import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';
import { taskQueries } from 'entities/task';
import { Empty } from 'shared/ui/empty';
import { Loading } from 'shared/ui/loading';
import { TaskRow } from 'widgets/tasks-list/task.row.ui';
import { useTasksFilter } from 'widgets/tasks-list/tasks-list.lib';

type TasksListWidgetProps = {
  tasksFilter: string;
};
export const TasksList = ({ tasksFilter }: TasksListWidgetProps) => {
  const { data, isLoading } = useQuery(taskQueries.tasksService.queryOptions());
  const { filteredTasks } = useTasksFilter(data, tasksFilter);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={filteredTasks}
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
