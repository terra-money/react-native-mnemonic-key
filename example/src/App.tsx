import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RNMnemonicKey } from 'react-native-mnemonic-key';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    setInterval(() => {
      RNMnemonicKey.create()
        .then((mk) => mk.accAddress)
        .then(setResult);
    }, 50);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
