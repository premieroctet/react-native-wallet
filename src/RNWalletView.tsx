import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { ButtonType, RNWalletViewProps } from './RNWallet.types';
import { Constants } from './RNWalletModule';

const NativeView: React.ComponentType<
  Omit<RNWalletViewProps, 'onPress'> & { onButtonPress?: () => void }
> = requireNativeViewManager('RNWallet');

export default function RNWalletView({
  onPress,
  style,
  buttonType = ButtonType.PRIMARY,
  ...props
}: RNWalletViewProps) {
  return (
    <NativeView
      onButtonPress={onPress}
      style={[
        styles.button,
        Platform.select({
          android: {
            width: Constants.buttonLayout!.baseWidthFromType(buttonType),
          },
          ios: {},
        }),
        style,
      ]}
      buttonType={buttonType}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      width: Constants.buttonLayout?.baseWidth,
      height: Constants.buttonLayout?.baseHeight,
    },
    android: {
      height: Constants.buttonLayout?.baseHeight,
    },
  })!,
});
