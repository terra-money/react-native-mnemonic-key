import { NativeModules } from 'react-native';
import { Buffer } from 'buffer'

type NativeMKExports = {
  generateMnemonic(): Promise<string>;
  derivePrivateKey(
    mnemonic: string,
    coinType: number,
    account: number,
    index: number
  ): Promise<string>;
};

export const MK: NativeMKExports = NativeModules.MnemonicKey;

import { RawKey } from '@terra-money/terra.js';

export const LUNA_COIN_TYPE = 330;

interface MnemonicKeyOptions {
  /**
   * Space-separated list of words for the mnemonic key.
   */
  mnemonic?: string;

  /**
   * BIP44 account number.
   */
  account?: number;

  /**
   * BIP44 index number
   */
  index?: number;

  /**
   * Coin type. Default is LUNA, 330.
   */
  coinType?: number;
}

const DEFAULT_OPTIONS = {
  account: 0,
  index: 0,
  coinType: LUNA_COIN_TYPE,
};

/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
export class RNMnemonicKey extends RawKey {
  private constructor(public mnemonic: string, public privateKey: Buffer) {
    super(privateKey);
    this.mnemonic = mnemonic;
  }

  /**
   * Creates a new signing key from a mnemonic phrase. If no mnemonic is provided, one
   * will be automatically generated.
   *
   * ### Providing a mnemonic
   *
   * ```ts
   * import { MnemonicKey } from 'terra.js';
   *
   * const mk = new MnemonicKey({ mnemonic: '...' });
   * console.log(mk.accAddress);
   * ```
   *
   * ### Generating a random mnemonic
   *
   * ```ts
   * const mk2 = new MnemonicKey();
   * console.log(mk2.mnemonic);
   * ```
   *
   * @param options
   */
  static async create(
    options: MnemonicKeyOptions = {}
  ): Promise<RNMnemonicKey> {
    const { account, index, coinType } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    let { mnemonic } = options;
    if (mnemonic === undefined) {
      mnemonic = await MK.generateMnemonic();
    }
    const pkHex = await MK.derivePrivateKey(mnemonic, coinType, account, index);
    const privateKey = Buffer.from(pkHex, 'hex');

    if (!privateKey) {
      throw new Error('Failed to derive key pair');
    }

    return new RNMnemonicKey(mnemonic, privateKey);
  }
}
