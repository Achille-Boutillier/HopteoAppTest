import { View, StyleSheet, TextInput } from "react-native";
import { useState, useRef } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";

export default function SearchBar({
  onPressSearch,
  handleStopResearch,
  handleIsEditing,
  // blurContent,
}) {
  const [isResearching, setIsResearching] = useState(false);
  const [userInput, setUserInput] = useState("");
  const textInputRef = useRef(null);

  function onPressStopResearch() {
    textInputRef.current.blur();    // quitter l'edition de UserInput
    textInputRef.current.clear();   // reset l'edition à nulle
    setUserInput("");
    setIsResearching(false);
    handleStopResearch();
  }

  function onSubmit() {
    if (textInputRef.current.isFocused()) {       // si userInput était en pleine édition
      textInputRef.current.blur();
      handleIsEditing(false);
      if (userInput) {
        onPressSearch(userInput);
      } else {
        handleStopResearch();
      }
    } else {        // si userInput n'était pas en édition
      textInputRef.current.focus();
      setIsResearching(true);
      // blurContent(0.2);
    }
  }

  function onPressIn() {
    handleIsEditing(true);
    // blurContent(0.2);
    setIsResearching(true);

  }

  function onEndEditing() {
    handleIsEditing(false);
    // blurContent(1);
    if (!userInput) {
      setIsResearching(false);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <PrimaryButton
        onPress={onSubmit}
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
        onPressIn={onPressIn}
        onEndEditing={onEndEditing}
        clearButtonMode="while-editing"
        onSubmitEditing={onSubmit}
        value={userInput}
        // type="email"
        autoCapitalize="none"
        selectionColor={Colors.orange500}
        // autoComplete="email"
        // keyboardType="email-address"
      />
      {isResearching ? (
        <PrimaryButton
          onPress={onPressStopResearch}
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
