import { StyleSheet, Text, View } from 'react-native';

import * as RNWallet from 'react-native-wallet';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{RNWallet.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
