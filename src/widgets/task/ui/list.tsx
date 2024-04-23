import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';
import { ToggleTask } from 'features';
import { TaskRow, taskQueries } from 'entities/task';
import { Empty, Loading, useTaskDispatch } from 'shared';

export const TasksListWidget = () => {
  // const dispatch = useTaskDispatch();
  // const { isFetching } =

  // useEffect(() => {
  // taskModel.getTasksListAsync()(dispatch);
  // }, []);

  const { data } = useSuspenseInfiniteQuery(
    taskQueries.infinityTasksService.queryOptions(),
  );

  // const filteredTasks = taskModel.selectors.getFilteredTasks();

  // if (isFetching) return <Loading />;

  return <Loading />;

  // return (
  //   <FlatList
  //     data={data}
  //     contentContainerStyle={styles.container}
  //     keyExtractor={item => item.id.toString()}
  //     renderItem={({ item }) => (
  //       <TaskRow data={item} before={<ToggleTask taskId={item.id} />} />
  //     )}
  //     ListEmptyComponent={<Empty desc="No tasks found" />}
  //   />
  // );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
});
