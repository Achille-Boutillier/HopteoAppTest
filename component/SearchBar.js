import { View, StyleSheet, TextInput } from "react-native";
import { useState, useRef } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";

export default function SearchBar({
  handlePressSearch,
  handleStopResearch,
  isResearchDisplayed,
  onBeginInput,
  onEndInput,
}) {
  const [userInput, setUserInput] = useState("");
  const textInputRef = useRef(null);

  function onPessStopResearch() {
    setUserInput("");
    handleStopResearch();
  }

  function onPressSearch() {
    handlePressSearch(userInput);
    textInputRef.current.blur();
  }

  return (
    <View style={styles.mainContainer}>
      <PrimaryButton
        onPress={onPressSearch}
        name="search"
        size={20}
        color={Colors.orange500}
        style={{ marginLeft: 5 }}
      />
      <TextInput
        ref={textInputRef}
        style={styles.inputContainer}
        placeholder="Rechercher"
        onChangeText={setUserInput} // .trim() to remove whitespace at the end and begining
        onPressIn={onBeginInput}
        onEndEditing={onEndInput}
        clearButtonMode="while-editing"
        onSubmitEditing={onPressSearch}
        value={userInput}
        // type="email"
        autoCapitalize="none"
        selectionColor={Colors.orange500}
        // autoComplete="email"
        // keyboardType="email-address"
      />
      {isResearchDisplayed ? (
        <PrimaryButton
          onPress={onPessStopResearch}
          name={"close"}
          size={25}
          color={Colors.orange500}
        />
      ) : null}
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
    paddingRight: "5%",
    paddingLeft: "1%",
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
