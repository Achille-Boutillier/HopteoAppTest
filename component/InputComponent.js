import { useState, useEffect, useRef } from "react";
import { 
  Keyboard,
  View, StyleSheet, TextInput, Text, Alert
} from "react-native";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";
import Modal from "react-native-modal";


// import { Dimensions } from "react-native";

// const deviceHeight = Dimensions.get("screen").height

export default function InputComponent({title, inputType, setInput, input, onSubmitEditing, setIsEditing}) {
  const [textInputSetting, setTextInputSetting] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isMailExplicationVisible, setIsMailExplicationVisible] = useState(false);

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

  function toggleEmailExplication() {
    setIsMailExplicationVisible((bool)=> !bool);
  }


  return (
    <View style={styles.mainContainer} >
      <Text style={styles.titleText}>{title}</Text>

      {inputType==="email" 
        ? (
          <PrimaryButton style={styles.visibilityButton} onPress={toggleEmailExplication} name={"help-circle-outline"} size={23} color={Colors.orange500}/>
        ) : null
      }

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

      <Modal isVisible={isMailExplicationVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            {/* <Text style={styles.modalHeaderText}>A propos de l'email</Text> */}
            <PrimaryButton
              onPress={toggleEmailExplication}
              name="close-outline"
              size={30}
              color={Colors.orange500}
              style={{alignItems: "flex-end" }}
            />
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalBodyTitle}>
              Confidentialité de l'email : 
            </Text>
            <Text style={styles.modalBodyText}>
              {"Hopteo accorde une importance particulière au respect de ta vie privée. Ton adresse email restera confidentielle : nous ne la partagerons en aucun cas avec des tiers. \n"}
            </Text>
            <Text style={styles.modalBodyTitle}>
              Pourquoi un email plutôt qu'un pseudo ?
            </Text>
            <Text style={styles.modalBodyText}>
              {"L'utilisation d'un email permet de récupérer ton compte en cas de perte du mot de passe. \n"}
            </Text>
            <Text style={styles.modalBodyTitle}>
              Pourquoi créer un compte ?
            </Text>
            <Text style={styles.modalBodyText}>
              {"L'application étant très récente, elle est en constante évolution avec des mises à jour majeures, notamment des restructurations plus optimisées des schémas de données. La création d'un compte permet d'assurer la compatibilité avec les futures mises à jour."}
            </Text>
            
            
          </View>
        </View>
      </Modal>


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


  // modal -----------------------

  modal: {
    width: "100%",
    backgroundColor: Colors.white,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  modalHeader: {
    width: "100%",
    // flexDirection: "row",
    // borderWidth: 1
  },
  modalHeaderText: {
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "500",
  },
  modalBody: {
    // alignItems: "center",
    paddingVertical: 20,
    width: "90%",
  },
  modalBodyTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 5,
  },
  modalBodyText: {
    fontSize: 14,
    textAlign: "left",
    textAlign: "justify"
  },
  
});
