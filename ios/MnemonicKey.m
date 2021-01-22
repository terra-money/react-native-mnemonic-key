#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MnemonicKey, NSObject)

RCT_EXTERN_METHOD(generateMnemonic: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(derivePrivateKey: (NSString*)mnemonic withHdPath: (NSString*)hdPath
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
