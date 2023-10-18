import { Platform } from 'react-native';

import RNWalletModule, { Constants } from './RNWalletModule';
import RNWalletView from './RNWalletView';

export function canAddPasses() {
  return RNWalletModule.canAddPasses();
}

/**
 * @param urlOrToken The pkpass file url on iOS, the pass token on Android
 * @returns boolean indicating if the pass was added
 */
export function addPass(urlOrToken: string): Promise<boolean> {
  return RNWalletModule.addPass(urlOrToken);
}

/**
 * @param url The pkpass file url
 * @returns boolean indicating if the pass exists in the wallet
 *
 *  @platform ios
 */
export function hasPass(url: string): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    console.warn('RNWallet.hasPass is only available on iOS');
    return Promise.resolve(false);
  }

  return RNWalletModule.hasPass(url);
}

/**
 * On iOS, the removePass function requires the appropriate entitlement to
 * be able to remove the pass. See [documentation](https://developer.apple.com/documentation/passkit/pkpasslibrary/1617083-removepass#discussion)
 *
 * @param url The pkpass file url
 *
 * @platform ios
 */
export function removePass(url: string): Promise<void> {
  if (Platform.OS !== 'ios') {
    console.warn('RNWallet.removePass is only available on iOS');
    return Promise.resolve();
  }

  return RNWalletModule.removePass(url);
}

export { RNWalletView, Constants };
export * from './RNWallet.types';
