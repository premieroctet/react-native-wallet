import { requireNativeModule } from "expo-modules-core";
import { Platform } from "react-native";

import { ButtonType, RNWalletConstants } from "./RNWallet.types";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const RNWalletModule = requireNativeModule("RNWallet");

export const Constants: RNWalletConstants = {
  buttonLayout: {
    baseWidth: RNWalletModule.buttonLayout?.baseWidth,
    baseHeight: RNWalletModule.buttonLayout?.baseHeight,

    baseWidthFromType(type) {
      if (Platform.OS === "android") {
        if (type === ButtonType.PRIMARY) {
          return RNWalletModule.buttonLayout?.baseWidthPrimary;
        }

        return RNWalletModule.buttonLayout?.baseWidthCondensed;
      }
    },
  },
};

export default RNWalletModule;
