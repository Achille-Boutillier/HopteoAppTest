import { useEffect } from "react";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text} from "react-native";
import { modifyPassword } from "../../BackEnd/controllers/setting";
import { alertProvider } from "../../BackEnd/errorHandler";
import PrimaryButton from "../../component/PrimaryButton";

import {Colors} from "../../constant/Colors";
import InputComponent from "../../component/InputComponent";
import TerciaryButton from "../../component/TerciaryButton";


export default function ModifyPassword({navigation}) {
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modifyPressed, setModifyPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  function onModifyPressed() {
    setModifyPressed(true);
  }

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }


  async function handleModification() {
    if (!!currentPassword && !!newPassword) {
      const data = await modifyPassword(currentPassword, newPassword);
      if (data?.message==="Mot de passe modifié avec succès !") {
        Alert.alert(
          "Succès",
          "Ton mot de passe a été modifié avec succès",
          [{ text: "Ok", style: "cancel", onPress: () => navigation.goBack()}]
        ); 
      } else if (!!data?.message) {
        setErrorMessage(data.message);
      } else {
        alertProvider(loginScreenNavigation);
      }
    
    } else {
      setErrorMessage("Les champs doivent être remplis");
    }
    
    setCurrentPassword("");
    setNewPassword("");
  }

  useEffect(() => {
    if (modifyPressed) {
      handleModification();
      setModifyPressed(false);
    }
  }, [modifyPressed])
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer} >
        <PrimaryButton 
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color={Colors.orange500}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={{fontSize: 18, fontWeight: "500"}}>Modification du Mot de passe</Text>
        <Text
          style={{
            textAlign: "center",
            color: Colors.orange500,
            marginBottom: "3%",
            marginTop: "3%",
          }}
        >
          {errorMessage}
        </Text>

        <View style={styles.formContainer}>
          <InputComponent
            title="Mot de passe actuel"
            inputType="password"
            setInput={setCurrentPassword}
            input={currentPassword}
            onSubmitEditing={()=> {}}
            setIsEditing={()=> {}}
          />
          <InputComponent
            // style={styles.inputContainer}
            title="Nouveau mot de passe"
            inputType="password"
            setInput={setNewPassword}
            input={newPassword}
            onSubmitEditing={()=> {}}
            setIsEditing={()=> {}}
          />
          
        </View>

        <TerciaryButton
          title="Modifier le Mot de Passe"
          onPress={onModifyPressed}
          color={Colors.orange500}
          isFullColor={true}
          fontSize={15}
        />
        {/* <TouchableOpacity style={styles.button} onPress={onModifyPressed}>
            <Text>Modifier le Mot de Passe</Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 40,
    paddingLeft: "6%",
    marginTop: "1%",
  },

  bodyContainer: {
    // borderWidth: 1,
    flex: 1,
    alignItems:"center",
    justifyContent: "center",
  },
  formContainer: {
    height: 170,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  inputContainer: {
    height: "22%",
    width: "80%",
    marginBottom: "3%",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,

  },
  button: {
    // width: "60%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 40,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: Colors.orange100,
    marginTop: "3%",
    borderRadius: 10,
  }
});