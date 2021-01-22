import { NativeModules } from 'react-native';

type MnemonicKeyType = {
  multiply(a: number, b: number): Promise<number>;
};

const { MnemonicKey } = NativeModules;

export default MnemonicKey as MnemonicKeyType;
