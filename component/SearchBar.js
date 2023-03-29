import { View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";

export default function SearchBar({ onPressSearch }) {
  const [userInput, setUserInput] = useState("");

  return (
    <View style={styles.mainContainer}>
      <PrimaryButton
        onPress={onPressSearch.bind(this, userInput)}
        name="search"
        size={20}
        color={Colors.orange500}
        style={{ marginLeft: 5 }}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Rechercher"
        onChangeText={setUserInput} // .trim() to remove whitespace at the end and begining
        onSubmitEditing={onPressSearch.bind(this, userInput)}
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
    width: "70%",
    height: 40,
    // mainContainerColor: Colors.white,
    alignItems: "center",
    alignSelf: "center",
    // justifyContent: "space-evenly",
    flexDirection: "row",
    borderRadius: 15,
    // borderWidth: 1,
    backgroundColor: Colors.white,
    marginBottom: "5%",
  },

  inputContainer: {
    flex: 1,
    height: "100%",
    // width: "70%",
    //  borderWidth: 1,
    // marginBottom: "3%",
    // borderRadius: 10,
    paddingLeft: 10,
    // borderWidth: 1,
    // fontSize: "80%",
  },
});
