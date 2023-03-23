import { useEffect } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { FlatList, StyleSheet, View, ActivityIndicator, Text, } from "react-native";
import { signup } from "../../BackEnd/controllers/userData";


import {Colors} from "../../constant/Colors";
import Logo from "../../assets/icons/logo.svg";




export default function SignUp({navigation}) {
   const [email, setEmail] = useState("");
   const [confirmEmail, setConfirmEmail] = useState("");
   const [password, setPassword] = useState("");
   const [signUpButtonPressed, setSignUpButtonPressed] = useState(false);
   const [signUpErrorMessage, setSignUpErrorMessage] = useState();

   function onSignUpPress() {
      setSignUpButtonPressed(true);
   }
   function backToLogin() {
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setSignUpErrorMessage();
      navigation.navigate("Login Screen");
   }

   async function trySignUp() {
      setSignUpButtonPressed(false);    // reset l'etat du bouton au cas où l'authentification echoue
      if (confirmEmail===email) {
         const signUpAnswer = await signup(email, password);
         if (signUpAnswer?.success) {
            setSignUpErrorMessage();     // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
            navigation.navigate("First Questions Screen");
         } else {
            if (signUpAnswer?.message) {
               setSignUpErrorMessage(signUpAnswer.message);
            } else {
               setSignUpErrorMessage("Une erreur s'est produite");
            }
         } 
         
      } else {
         setSignUpErrorMessage("Les deux email doivent être identiques");
      }
   }

   useEffect(() => {
      if (signUpButtonPressed) {
         trySignUp();
      }
   }, [signUpButtonPressed])
  
   return (
      <View style={styles.mainContainer}>
         <Logo width={101} height={101} />
         
         <Text style={{fontSize: 18, fontWeight: "500"}}>Crée ton compte Hopteo !</Text>

         <Text style={{textAlign: "center", color: Colors.orange500, marginBottom: "3%", marginTop: "3%", width: "75%"}}>{signUpErrorMessage}</Text>
      
         <View style={styles.formContainer}>
            <TextInput
            style={styles.inputContainer}
            placeholder="email"
            onChangeText={(text)=> setEmail(text.trim())}
            value={email}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            selectionColor={Colors.orange500}
            

            />
            <TextInput
            style={styles.inputContainer}
            placeholder="Confirmer l'email"
            onChangeText={(text)=> setConfirmEmail(text.trim())}
            value={confirmEmail}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            selectionColor={Colors.orange500}

            />
            <TextInput
            style={styles.inputContainer}
            placeholder="Mot de passe"
            onChangeText={(text)=> setPassword(text.trim())}
            value={password}
            autoCapitalize="none"
            secureTextEntry
            selectionColor={Colors.orange500}

            />

            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text>Créer mon compte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: "10%"}} onPress={backToLogin}>
            <Text style={{textAlign: "center"}}>{"J'ai déjà un compte"}</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}



const styles = StyleSheet.create({
 mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems:"center",
    justifyContent: "center",
    // marginTop: "10%",
 },
 formContainer: {
   //  height: "40%",
   height: 300,
   width: "80%",
   alignItems: "center",
   justifyContent:"center",
   backgroundColor: Colors.blue400,
   borderRadius: 20,
 },
 inputContainer: {
    height: "15%",
    width: "80%",
   //  borderWidth: 1,
    marginBottom: "3%",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
 },
 button: {
    width: "60%",
    height: 30,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: Colors.orange100,
    marginTop: "3%",
    borderRadius: 10,
 }
});