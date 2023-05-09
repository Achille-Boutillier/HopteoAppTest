import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Colors } from "../constant/Colors";

import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("screen").height

export default function InputComponent({title, inputType, setInput, input, onSubmitEditing, setIsEditing }) {
  const [textInputSetting, setTextInputSetting] = useState({});


  function onPressIn() {
    setIsEditing ? setIsEditing(true) : null ;
    console.log("in")
  }

  function onBlur(){
    console.log("dismissed")
    setIsEditing ? setIsEditing(false) : null;
  }


  useEffect(()=> {
    let placeholder;
    let autoComplete;
    let keyboardType;
    let secureTextEntry 
    if (inputType==="email") {
      placeholder = "example@mail.com";
      autoComplete="email";
      keyboardType="email-address";
      secureTextEntry = false;
    } else if (inputType==="password") {
      placeholder="*****";
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
        onPressIn={onPressIn}
        // onEndEditing={onEndEditing}
        onBlur={onBlur}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-around",
    // borderWidth: 1,
    // height: "42%",
    // height: deviceHeight*0.1,
    height: 90,
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
    paddingVertical: 1,
    backgroundColor: Colors.white,
  },
  
});
