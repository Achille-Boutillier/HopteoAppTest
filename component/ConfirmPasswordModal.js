

import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "../constant/Colors";
import Modal from "react-native-modal";
import PrimaryButton from "./buttons/PrimaryButton";
// import SecondaryButton from "./buttons/SecondaryButton";
import TerciaryButton from "./buttons/TerciaryButton";
import { useState } from "react";
import InputComponent from "./InputComponent";
// import EStyleSheet from "react-native-extended-stylesheet";

export default function ConfirmPasswordModal({isVisible, handlePasswordModal, modalBodyText, modalErrorMessage, onSubmitPassword, modalButtonName }) {

  const [password, setPassword] = useState("");


  function onSubmit(){
    onSubmitPassword(password);
    setPassword("");
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Attention !</Text>
          <PrimaryButton
            onPress={handlePasswordModal}
            name="close-outline"
            size={40}
            color={Colors.orange500}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{modalBodyText}</Text>
          <Text style={styles.errorMessageText}>{modalErrorMessage}</Text>
          <InputComponent
            title="Mot de passe" 
            inputType="password" 
            input={password} 
            setInput={setPassword} 
            onSubmitEditing={onSubmit} 
            // setIsEditing={setIsEditing}
          />
          {/* <View style={styles.modalPasswordContainer}>
            <TextInput
              style={styles.passwordInput}
              autoCapitalize="none" //empêcher l'autocapitalisation ou autocorrection du phone
              autoCorrect={false}
              onChangeText={(enteredText) => setPassword(enteredText)}
              secureTextEntry
              value={password}
              placeholder="Mot de passe"
              onSubmitEditing={onSubmit}
            />
            
          </View> */}
          <TerciaryButton
            title={modalButtonName}
            onPress={onSubmit}
            color={Colors.orange500}
            isFullColor={true}
            fontSize={15}
          />
        </View>
      </View>
      </Modal>
  );
}


const styles = StyleSheet.create({
  main: {
    height: 350,
    width: "100%",
    backgroundColor: Colors.white,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "500",
  },
  body: {
    justifyContent: "space-evenly",
    // borderWidth: 1,
    alignItems: "center",
    flex: 1,
    width: "90%",
  },
  bodyText: {
    fontSize: 18,
    textAlign: "left",
    // selectable: true,
    // marginVertical: 30,
  },
  modalPasswordContainer: {
    height: "55%",
    width: "100%",
    backgroundColor: Colors.grey300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  passwordInput: {
    // borderWidth: 1,
    backgroundColor: Colors.white,
    // paddingVertical: 3,
    paddingHorizontal: 10,
    width: "70%",
    height: "30%",
    borderRadius: 3,
    marginBottom: 5,
  },
  errorMessageText: {
    color: Colors.orange500,
  },
});
