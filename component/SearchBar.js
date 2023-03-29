import { View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Colors } from "../constant/Colors";

export default function SearchBar({}) {
  const [userInput, setUserInput] = useState("");

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.inputContainer}
        placeholder="Rechercher"
        onChangeText={setUserInput} // .trim() to remove whitespace at the end and begining
        value={userInput}
        // type="email"
        autoCapitalize="none"
        selectionColor={Colors.orange500}
        // autoComplete="email"
        // keyboardType="email-address"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    width: "100%",
    height: 50,
    mainContainerColor: Colors.white,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  inputContainer: {
    height: 40,
    width: "70%",
    //  borderWidth: 1,
    marginBottom: "3%",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
  },
});
