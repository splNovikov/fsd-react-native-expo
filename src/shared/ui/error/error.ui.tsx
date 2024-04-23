import { UnexpectedErrorDto } from 'shared/api/copilot';
import { GenericError, isHttpErrorCode } from 'shared/lib/fetch';
import { FlatList, StyleSheet, View, Text } from 'react-native';

type ErrorHandlerProps = {
  error: GenericError<any>;
  size?: 'Small' | 'Medium' | 'Large' | 'Full';
};

export function ErrorHandler(props: ErrorHandlerProps) {
  const { error, size = 'Medium' } = props;
  const className = `${styles.wrapper} ${styles[`loader${size}`]}`;

  if (isHttpErrorCode(422)(error)) {
    const data = JSON.parse(error.response as string) as UnexpectedErrorDto;
    const errors: string[] = [];

    Object.entries(data.errors).forEach(([key, explanations]) => {
      explanations.forEach(explanation => {
        errors.push(key.concat(' ', explanation));
      });
    });

    return (
      <View className={className}>
        <FlatList
          data={errors}
          renderItem={({ item }) => <Text>{item}</Text>}></FlatList>
      </View>
    );
  }

  return (
    <View className={className}>
      <Text>{error.explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderSmall: {
    height: 50,
  },

  loaderMedium: {
    height: 200,
  },

  loaderLarge: {
    height: 400,
  },

  loaderFull: {
    height: 100,
  },
});
