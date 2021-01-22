package com.reactnativemnemonickey

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise


import org.web3j.crypto.Bip32ECKeyPair
import org.web3j.crypto.MnemonicUtils

import java.math.BigInteger
import java.security.SecureRandom


fun byteArrayToHex(a: ByteArray): String {
  return a.joinToString("") {
    java.lang.String.format("%02x", it)
  }.substring(2);
}
class MnemonicKeyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MnemonicKey"
    }


    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    fun generateMnemonic(promise: Promise) {
        val entropy = ByteArray(32)
        var random = SecureRandom()
        random.nextBytes(entropy)
        promise.resolve(MnemonicUtils.generateMnemonic(entropy))
    }

    @ReactMethod
    fun derivePrivateKey(mnemonic: String, coinType: Int, account: Int, index: Int, promise: Promise) {
        val seed = MnemonicUtils.generateSeed(mnemonic, null)
        val masterKey = Bip32ECKeyPair.generateKeyPair(seed)
        val path = intArrayOf((44 or -0x80000000), (coinType or -0x80000000), (account or -0x80000000), 0, index)
        val terraHD = Bip32ECKeyPair.deriveKeyPair(masterKey, path)
        promise.resolve(byteArrayToHex(terraHD.getPrivateKeyBytes33()))
    }
    
}
