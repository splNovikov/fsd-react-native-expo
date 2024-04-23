import { FC } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScreenProps } from 'shared/lib/router';

export const TaskScreen: FC<ScreenProps<'Task'>> = ({ route }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text>{route.params.id}</Text>
      </View>
    </SafeAreaView>
  );
};
