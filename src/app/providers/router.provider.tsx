import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TasksScreen } from 'screens/tasks';
import { RootStackParamList } from 'shared/lib/router';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Routing = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Tasks">
        <RootStack.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
