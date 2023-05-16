import { useEffect, useState } from "react";
// import { TextInput, TouchableOpacity } from "react-native";
import {StyleSheet} from "react-native";
import { signup, storeNewAuthData } from "../../BackEnd/controllers/userData";

import { Colors } from "../../constant/Colors";
import AuthComponent from "../../component/AuthComponent";
// import { useDispatch } from "react-redux";


export default function SignUp({ navigation, route }) {

  const [errorMessage, setErrorMessage] = useState();


  // function resetNavigationScreen(screen) {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: screen }],
  //   });
  // }

  // function onSignUpPress() {
  //   setSignUpButtonPressed(true);
  // }

  // function backToLogin() {
  //   setEmail("");
  //   setPassword("");
  //   setErrorMessage();
  //   navigation.navigate("Login Screen");
  // }

  async function trySignUp(email, password) {
    // setSignUpButtonPressed(false); // reset l'etat du bouton au cas où l'authentification echoue
    const signUpAnswer = await signup(email, password);
    if (signUpAnswer?.success) {
      setErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
      storeNewAuthData(signUpAnswer.authData);
      // resetNavigationScreen("OnBoardScreen");
      navigation.navigate("OnBoardScreen");
      // navigation.navigate("First Questions Screen");
    } else {
      if (signUpAnswer?.message) {
        setErrorMessage(signUpAnswer.message);
      } else {
        setErrorMessage("Une erreur s'est produite");
      }
    }
  }

  // useEffect(() => {
  //   if (signUpButtonPressed) {
  //     trySignUp();
  //   }
  // }, [signUpButtonPressed]);

  function goToLogin() {
    setErrorMessage();
    navigation.navigate("Login Screen");
  }

  return (
    <AuthComponent typeScreen="signup" onSubmit={trySignUp} onChangeTypeScreen={goToLogin} errorMessage={errorMessage}/>
  );
}

// const styles = StyleSheet.create({
  
// });
