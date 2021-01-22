#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MnemonicKey, NSObject)

RCT_EXTERN_METHOD(generateMnemonic: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(derivePrivateKey: (NSString*)mnemonic 
                 withCoinType: (NSInteger*)coinType
                 withAccount: (NSInteger*)account
                 withIndex: (NSInteger*)index
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
@end
