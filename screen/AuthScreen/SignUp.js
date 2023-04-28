import { useEffect } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import {FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { signup, storeNewAuthData } from "../../BackEnd/controllers/userData";

import { Colors } from "../../constant/Colors";
import Logo from "../../assets/icons/logo.svg";
import InputComponent from "../../component/InputContainer";
import {BrandComponent} from "../../component/TopBar";
import TerciaryButton from "../../component/TerciaryButton";
import { useDispatch } from "react-redux";


export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpButtonPressed, setSignUpButtonPressed] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState();


  function onSignUpPress() {
    setSignUpButtonPressed(true);
  }
  function backToLogin() {
    setEmail("");
    setPassword("");
    setSignUpErrorMessage();
    navigation.navigate("Login Screen");
  }

  async function trySignUp() {
    setSignUpButtonPressed(false); // reset l'etat du bouton au cas où l'authentification echoue
    const signUpAnswer = await signup(email, password);
    if (signUpAnswer?.success) {
      setSignUpErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
      storeNewAuthData(signUpAnswer.authData);
      navigation.navigate("First Questions Screen");
    } else {
      if (signUpAnswer?.message) {
        setSignUpErrorMessage(signUpAnswer.message);
      } else {
        setSignUpErrorMessage("Une erreur s'est produite");
      }
    }
  }

  useEffect(() => {
    if (signUpButtonPressed) {
      trySignUp();
    }
  }, [signUpButtonPressed]);

  return (
    <View style={styles.mainContainer}>
     
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Inscription</Text>
      </View>


      <View style={styles.bodyContainer}>

        <Text style={styles.catchPhrase}>
          Crée ton compte gratuitement pour continuer sur Hopteo !
        </Text>

        <Text style={styles.errorMessage} >{signUpErrorMessage}</Text>

        <View style={styles.formContainer}>
          <InputComponent title="Email" input={email} setInput={setEmail} />
          <InputComponent title="Mot de passe" input={password} setInput={setPassword} onSubmitEditing={onSignUpPress}/>
        </View>

          
        <TerciaryButton title="Je m'inscris" onPress={onSignUpPress} color={Colors.orange500} isFullColor={true}/>
        <TerciaryButton title="J'ai déjà un compte" onPress={backToLogin} color={Colors.orange500} />
        
        <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.orange500,
    justifyContent: "flex-start",
    // marginTop: "10%",
  },
  headerContainer: {
    height: "13%",
    alignSelf: "center",
    justifyContent: "center",
    // borderWidth: 1,

  },
  pageTitle: {
    // verticalAlign: "center",
    textAlign: "center",
    color: Colors.white,
    fontSize: 30,
    fontWeight: "700",

  },

  bodyContainer: {
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0,
    height: "87%",
    width: "100%",
    borderTopLeftRadius: 80,
    alignItems: "center",
  },

  catchPhrase: { 
    fontSize: 18, 
    fontWeight: "500",
    textAlign: "center",
    marginTop: 50,
    marginHorizontal: "10%",
  },

  errorMessage: {
    textAlign: "center", 
    color: Colors.orange500, 
    marginBottom: "3%", 
    marginTop: "3%", 
    width: "75%",
  },
  formContainer: {
    height: 170,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  

  button: {
    width: "60%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange100,
    marginTop: "3%",
    borderRadius: 10,
  },
});
