import { View, StyleSheet, TextInput } from "react-native";
import { useState, useRef } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";

export default function SearchBar({searchInput, setSearchInput ,onSubmitResearch, handleStopResearch, onBeginResearch,}) {
  const [isResearching, setIsResearching] = useState(false);
  const textInputRef = useRef(null);

  function onPressStopResearch() {
    if (textInputRef.current.isFocused()){
      textInputRef.current.blur();    // quitter l'edition de searchInput
    }
    textInputRef.current.clear();   // reset l'edition à nulle
    setSearchInput("");
    setIsResearching(false);
    handleStopResearch();
  }

  function onSubmit() {
    if (textInputRef.current.isFocused()) {       // si userInput était en pleine édition
      textInputRef.current.blur();
      if (searchInput!=="") {
        onSubmitResearch();
      } else {
        handleStopResearch();
      }
    } else {        // si userInput n'était pas en édition
      textInputRef.current.focus();
      setIsResearching(true);
      onBeginResearch();
    }
  }

  function onPressIn() {
    // handleIsEditing(true);
    onBeginResearch();
    setIsResearching(true);

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
        onChangeText={setSearchInput} // .trim() to remove whitespace at the end and begining
        onPressIn={onPressIn}
        // onEndEditing={onEndEditing}
        clearButtonMode="while-editing"
        onSubmitEditing={onSubmit}
        value={searchInput}
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
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 15,
    paddingRight: "5%",
    paddingLeft: "1%",
    backgroundColor: Colors.white,
    marginBottom: "5%",
  },

  inputContainer: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
  
  },
});
