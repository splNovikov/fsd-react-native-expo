import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from 'entities/task/task.types';
import { NavProp } from 'shared/lib/router';

type TaskRowProps = {
  data: Task;
  before?: ReactNode;
};

export const TaskRow = ({ data, before }: TaskRowProps) => {
  const { id, title, completed } = data;
  const { navigate } = useNavigation<NavProp<'Tasks'>>();

  // const onTaskPress = () => navigate('Task', { id });
  const onTaskPress = () => console.log('navigate');

  return (
    <TouchableOpacity onPress={onTaskPress}>
      <View className="flex-row items-center h-12 bg-zinc-50 px-2 my-2 mx-4 rounded-lg shadow shadow-slate-300">
        {before}
        <Text
          numberOfLines={2}
          className={`flex-1 text-base pr-2 ${
            completed ? 'line-through' : 'no-underline'
          }`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
