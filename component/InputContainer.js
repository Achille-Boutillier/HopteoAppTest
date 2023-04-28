import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Colors } from "../constant/Colors";


export default function InputComponent({title, setInput, input, onSubmitEditing }) {
  const [textInputSetting, setTextInputSetting] = useState({});

  useEffect(()=> {
    let placeholder;
    let autoComplete;
    let keyboardType;
    let secureTextEntry 
    if (title==="Email") {
      placeholder = "example@mail.com";
      autoComplete="email";
      keyboardType="email-address";
      secureTextEntry = false;
    } else if (title==="Mot de passe") {
      placeholder="************";
      autoComplete=null;
      keyboardType=null;
      secureTextEntry=true;
    }
    setTextInputSetting({placeholder, autoComplete, keyboardType, secureTextEntry })
  }, [])


  return (
    <View style={styles.mainContainer} >
      <Text style={styles.titleText}>{title}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setInput(text.trim())}
        autoCapitalize="none"
        value={input}
        placeholder={textInputSetting.placeholder}
        autoComplete={textInputSetting.autoComplete}
        keyboardType={textInputSetting.keyboardType}
        secureTextEntry={textInputSetting.secureTextEntry}
        onSubmitEditing={onSubmitEditing ? onSubmitEditing : null}
        selectionColor={Colors.orange500}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-between",
    // borderWidth: 1,
    height: "42%",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  titleText: {
    fontWeight: "600",

  },
  textInput: {
    // height: "15%",
    width: "100%",
    alignSelf: "center",
    //  borderWidth: 1,
    marginBottom: "3%",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
  },
  
});
