import { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as RNWallet from "react-native-wallet";

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const onAdd = async () => {
    try {
      const isAdded = await RNWallet.addPass(inputValue);

      Alert.alert("Pass added", isAdded ? "Yes" : "No");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const onCheckPassExists = async () => {
    try {
      const passExists = await RNWallet.hasPass(inputValue);

      Alert.alert("Pass exists", passExists ? "Yes" : "No");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const onRemovePass = async () => {
    try {
      await RNWallet.removePass(inputValue);

      Alert.alert("Pass removed");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const onCanAddPasses = async () => {
    try {
      const canAddPasses = await RNWallet.canAddPasses();

      Alert.alert("Can add passes", canAddPasses ? "Yes" : "No");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>
          {Platform.select({
            ios: "Pkpass URL",
            android: "Pass token",
          })}
        </Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={Platform.select({
            ios: "Pkpass URL",
            android: "Pass token",
          })}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button title="Check if can add passes" onPress={onCanAddPasses} />
      <Button title="Check if pass exists" onPress={onCheckPassExists} />
      <Button title="Remove pass" onPress={onRemovePass} />
      <View style={styles.buttonsContainer}>
        <Text style={styles.title}>
          Wallet button {Platform.select({ ios: "black", android: "primary" })}
        </Text>
        <RNWallet.RNWalletView
          buttonStyle={RNWallet.ButtonStyle.BLACK}
          buttonType={RNWallet.ButtonType.PRIMARY}
          onPress={onAdd}
        />
        <Text style={styles.title}>
          Wallet button{" "}
          {Platform.select({ ios: "black outline", android: "condensed" })}
        </Text>
        <RNWallet.RNWalletView
          buttonStyle={RNWallet.ButtonStyle.BLACK_OUTLINE}
          buttonType={RNWallet.ButtonType.CONDENSED}
          onPress={onAdd}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
  buttonsContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 10,
    gap: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },

  inputContainer: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
