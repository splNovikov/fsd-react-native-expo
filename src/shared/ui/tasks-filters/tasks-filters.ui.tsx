import React, { useReducer } from 'react';
import { View } from 'react-native';
import { RadioButton, RadioButtonGroup } from 'shared/ui/radio';

const resetFilters = {
  all: false,
  open: false,
  completed: false,
};

type TasksFiltersProps = {
  onTasksFilter: (tasksFilter: 'all' | 'open' | 'completed') => void;
};
export const TasksFilters = ({ onTasksFilter }: TasksFiltersProps) => {
  const [radioMap, updateRadioMap] = useReducer(
    (_: Filters, n: keyof Filters) => ({
      ...resetFilters,
      ...{ [n]: true },
    }),
    { ...resetFilters, all: true },
  );

  const onRadioButtonPress = (key: keyof Filters) => {
    updateRadioMap(key);
    onTasksFilter(key);
  };

  return (
    <View className="p-2 border-b border-neutral-100">
      <RadioButtonGroup>
        {Object.keys(radioMap).map(key => (
          <RadioButton
            key={key}
            label={`${key}:`}
            selected={radioMap[key as keyof Filters]}
            onValueChange={_ => onRadioButtonPress(key as keyof Filters)}
          />
        ))}
      </RadioButtonGroup>
    </View>
  );
};

type Filters = typeof resetFilters;
