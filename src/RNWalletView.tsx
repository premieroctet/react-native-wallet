import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RNWalletViewProps } from './RNWallet.types';

const NativeView: React.ComponentType<RNWalletViewProps> =
  requireNativeViewManager('RNWallet');

export default function RNWalletView(props: RNWalletViewProps) {
  return <NativeView {...props} />;
}
