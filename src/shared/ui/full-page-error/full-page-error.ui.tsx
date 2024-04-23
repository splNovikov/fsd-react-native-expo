import { GenericError } from 'shared/lib/fetch';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorHandler } from '../error';

type FullPageErrorProps = {
  error: GenericError<any>;
};

export function FullPageError(props: FullPageErrorProps) {
  const { error } = props;

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.innerWrapper}>
        <View className="container">
          <Text className="logo-font">Something went wrong:</Text>
          <ErrorHandler error={error} size="small" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerWrapper: {
    color: '#fff',
    backgroundColor: '#333',
    // padding: "2rem",
    textAlign: 'center',
    width: '100%',
  },
});
