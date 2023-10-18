# react-native-wallet

A module built with [Expo Modules](https://docs.expo.dev/modules/overview/) that provides wallet features for iOS and Android.

Uses [PassKit](https://developer.apple.com/documentation/passkit/wallet) on iOS, [Google Wallet API](https://developers.google.com/wallet/generic) on Android.

# Installation

```bash
yarn add @premieroctet/react-native-wallet
```

## Expo users

This module is not compatible with Expo Go. You will need to [build a custom dev client](https://docs.expo.dev/develop/development-builds/installation/).

## Bare React Native users

You will need to install [Expo Modules](https://docs.expo.dev/bare/installing-expo-modules/) on your project.

# Usage

```tsx
import { Alert, Button, StyleSheet, View } from 'react-native';
import * as RNWallet from 'react-native-wallet';

export default function App() {
  const onAdd = async () => {
    try {
      const isAdded = await RNWallet.addPass('<PassUrlOrToken>');

      Alert.alert('Pass added', isAdded ? 'Yes' : 'No');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const onCheckPassExists = async () => {
    try {
      const passExists = await RNWallet.hasPass('<PassUrlOrToken>');

      Alert.alert('Pass exists', passExists ? 'Yes' : 'No');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const onRemovePass = async () => {
    try {
      await RNWallet.removePass('<PassUrlOrToken>');

      Alert.alert('Pass removed');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const onCanAddPasses = async () => {
    try {
      const canAddPasses = await RNWallet.canAddPasses();

      Alert.alert('Can add passes', canAddPasses ? 'Yes' : 'No');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Check if can add passes" onPress={onCanAddPasses} />
      <Button title="Check if pass exists" onPress={onCheckPassExists} />
      <Button title="Remove pass" onPress={onRemovePass} />
      <RNWallet.RNWalletView
        buttonStyle={RNWallet.ButtonStyle.BLACK}
        buttonType={RNWallet.ButtonType.PRIMARY}
        onPress={onAdd}
      />
    </View>
  );
}
```

### API

#### Methods

- `canAddPasses(): boolean`: Check if the device can add passes.
- `addPass(urlOrToken: string): Promise<boolean>`: Add a pass to the wallet. Returns `true` if the pass was added or if its already added. Returns `false` if the user cancelled the operation. `urlOrToken` should be the pkpass URL for iOS, and the pass JWT for Android.
- `hasPass(urlOrToken: string): Promise<boolean>`: Check if a pass exists in the wallet. Returns `true` if the pass exists, `false` otherwise. On Android, this always returns `false`.
- `removePass(urlOrToken: string): Promise<void>`: Remove a pass from the wallet. On Android, this is no-op. On iOS, make sure you have the correct entitlements. See [documentation](https://developer.apple.com/documentation/passkit/pkpasslibrary/1617083-removepass#discussion).

#### Props

- `buttonStyle: ButtonStyle`: The button style to use for the iOS button. Can be either `BLACK` or `BLACK_OUTLINE`. Defaults to `BLACK`. _Typescript users: use the ButtonStyle enum_
- `buttonType: ButtonType`: The button type to use for the Android button. Can be either `PRIMARY` or `CONDENSED`. Defaults to `PRIMARY`. _Typescript users: use the ButtonType enum_
- `onPress: () => void`: The callback executed when the button is pressed.
- `style: ViewStyle`: The style to apply to the button. By default, width and height are already set. On Android, the width is set depending on the button type.

#### Constants

The library exports a `Constants` object with the following properties:

- `buttonLayout`:
  - `baseWidth`: The base width of the button. It is undefined on Android.
  - `baseHeight`: The base height of the button.
  - `baseWidthFromType`: The base width of the button depending on the button type. On iOS, it returns undefined.

# Contributing

Contributions are very welcome!

To get started, fork and clone the repo, and install the dependencies in both root and example folders. Don't forget to install the pods in the example's ios folder.

To run the example app, run `yarn start` in the root folder, and `yarn ios` or `yarn android` in the example folder.

To updathe iOS code, open the `example/ios/reactnativewalletexample.xcworkspace` file, and edit the `RNWallet` pod files.

To update the Android code, open the `example/android` folder in Android Studio and edit the `react-native-wallet` module.
