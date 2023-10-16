import * as React from 'react';

import { RNWalletViewProps } from './RNWallet.types';

export default function RNWalletView(props: RNWalletViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
