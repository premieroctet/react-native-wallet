import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RNWallet.web.ts
// and on native platforms to RNWallet.ts
import RNWalletModule from './RNWalletModule';
import RNWalletView from './RNWalletView';
import { ChangeEventPayload, RNWalletViewProps } from './RNWallet.types';

// Get the native constant value.
export const PI = RNWalletModule.PI;

export function hello(): string {
  return RNWalletModule.hello();
}

export async function setValueAsync(value: string) {
  return await RNWalletModule.setValueAsync(value);
}

const emitter = new EventEmitter(RNWalletModule ?? NativeModulesProxy.RNWallet);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RNWalletView, RNWalletViewProps, ChangeEventPayload };
