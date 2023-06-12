import { useState, useEffect, useRef } from "react";
import { 
  Keyboard,
  View, StyleSheet, TextInput, Text, TouchableOpacity,
} from "react-native";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";


// import { Dimensions } from "react-native";

// const deviceHeight = Dimensions.get("screen").height

export default function InputComponent({title, inputType, setInput, input, onSubmitEditing, setIsEditing,}) {
  const [textInputSetting, setTextInputSetting] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const inputRef = useRef(null);

// ---- handle android/ios back button --------------------------

  // const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',                  // 'keyboardDidShow' existe aussi
      () => inputRef.current.blur(),
      // () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);



  function onFocus() {
    setIsEditing ? setIsEditing(true) : null ;
    // setIsEditing(true);
    // console.log("in")
  }

  function onBlur(){
    // console.log("dismissed")
    setIsEditing ? setIsEditing(false) : null ;
  }


  useEffect(()=> {
    let placeholder;
    let autoComplete;
    let keyboardType;
    let secureTextEntry;
    if (inputType==="email") {
      placeholder = "example@mail.com";
      autoComplete="email";
      keyboardType="email-address";
      secureTextEntry = false;
    } else if (inputType==="password") {
      placeholder="*****";
      autoComplete="off";
      keyboardType="default";
      // keyboardType="email-address";
      secureTextEntry=true; 
    } else if (inputType==="numeric") {
      placeholder="123456";
      autoComplete="off";
      keyboardType="numeric";
      secureTextEntry=false;
    }
    setIsPasswordVisible(secureTextEntry);
    setTextInputSetting({placeholder, autoComplete, keyboardType, autoCapitalize: "none" })
  }, [inputType])


  function toggleVisibility() {
    setIsPasswordVisible((bool)=> !bool);
  }


  return (
    <View style={styles.mainContainer} >
      <Text style={styles.titleText}>{title}</Text>

      {inputType==="password" 
        ? (
          <PrimaryButton style={styles.visibilityButton} onPress={toggleVisibility} name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={Colors.orange500}/>
        ) : null
      }
      
      <TextInput
        ref={inputRef}
        style={styles.textInput}
        onChangeText={(text) => setInput(text.trim())}
        // autoCapitalize="none"
        autoCapitalize={textInputSetting.autoCapitalize}
        value={input}
        placeholder={textInputSetting.placeholder}
        // autoComplete={textInputSetting.autoComplete}
        keyboardType={textInputSetting.keyboardType}
        secureTextEntry={isPasswordVisible}
        onSubmitEditing={onSubmitEditing ? onSubmitEditing : null}
        selectionColor={Colors.orange500}
        onFocus={onFocus}
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
    height: 80,
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

  visibilityButton: {
    position: "absolute",
    right: 15,
    top: 5
  },
  visibilityButtonText: {

  },
  
});
