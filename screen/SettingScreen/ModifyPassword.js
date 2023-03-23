import { useEffect } from "react";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text} from "react-native";
import { modifyPassword } from "../../BackEnd/controllers/setting";
import { alertProvider } from "../../BackEnd/errorHandler";
import PrimaryButton from "../../component/PrimaryButton";

import {Colors} from "../../constant/Colors";



export default function ModifyPassword({navigation}) {
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modifyPressed, setModifyPressed] = useState(false);
  const [message, setMessage] = useState();

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
        setMessage(data.message);
      } else {
        alertProvider(loginScreenNavigation);
      }
    
    } else {
      setMessage("Les champs doivent être remplis");
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
            marginTop: "10%",
          }}
        >
          {message}
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputContainer}
            placeholder="Mot de passe actuel"
            onChangeText={setCurrentPassword}
            value={currentPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputContainer}
            placeholder="Nouveau mot de passe"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onModifyPressed}>
            <Text>Modifier le Mot de Passe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 40,
    // borderWidth: 1,

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
    // height: "40%",
    height: 220,
    width: "80%",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: Colors.blue400,
    borderRadius: 20,
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