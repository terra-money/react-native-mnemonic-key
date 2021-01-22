import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RNMnemonicKey } from 'react-native-mnemonic-key';

export default function App() {
  const [result, setResult] = React.useState<RNMnemonicKey | undefined>();

  React.useEffect(() => {
    RNMnemonicKey.create({
      mnemonic:
        'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
      coinType: 118,
      account: 5,
      index: 32,
    }).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Address: {result?.accAddress}</Text>
      <Text>ValAddress: {result?.valAddress}</Text>
      <Text>Mnemonic: {result?.mnemonic}</Text>
      <Text>PrivateKey: {result?.privateKey.toString('hex')}</Text>
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
