import React, { useReducer } from 'react';
import { View } from 'react-native';
import { RadioButton, RadioButtonGroup } from 'shared/ui/radio';

const resetFilters = {
  all: false,
  open: false,
  closed: false,
};

export const TasksFilters = () => {
  const isLoading = false;

  const [radioMap, updateRadioMap] = useReducer(
    (_: Filters, n: keyof Filters) => ({
      ...resetFilters,
      ...{ [n]: true },
    }),
    { ...resetFilters, all: true },
  );

  const onRadioButtonPress = (key: keyof Filters) => {
    updateRadioMap(key);
  };

  return (
    <View className="p-2 border-b border-neutral-100">
      <RadioButtonGroup>
        {Object.keys(radioMap).map(key => (
          <RadioButton
            key={key}
            label={`${key}:`}
            selected={radioMap[key as keyof Filters]}
            disabled={isLoading}
            onValueChange={_ => onRadioButtonPress(key as keyof Filters)}
          />
        ))}
      </RadioButtonGroup>
    </View>
  );
};

type Filters = typeof resetFilters;
