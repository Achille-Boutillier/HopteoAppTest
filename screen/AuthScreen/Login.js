import { useEffect } from "react";
import { useState } from "react";

import { login, storeNewAuthData, storeSplashData } from "../../BackEnd/controllers/userData";
import { useDispatch } from "react-redux";

import AuthComponent from "../../component/AuthComponent";


export default function Login({ navigation }) {
  
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  async function tryLogin(email, password) {
    // setLoginButtonPressed(false); // reset l'etat du bouton au cas où l'authentification echoue
    const loginAnswer = await login(email, password);
    if (loginAnswer?.success) {
      storeNewAuthData(loginAnswer.authData);
      let nextScreen;
      if (loginAnswer?.userSettingStatus) {
        storeSplashData(loginAnswer.splashData, dispatch);
        nextScreen = "Main Screens";
      } else {
        nextScreen = "First Questions Screen";
      }
      setErrorMessage();
      navigation.navigate(nextScreen);
    } else {
      if (loginAnswer?.message) {
        // console.log("je passe dans else if");
        setErrorMessage(loginAnswer?.message);
      } else {
        setErrorMessage("Echec de la tentative de connexion");
      }
    }
  }

  function goToSignup() {
    setErrorMessage();
    navigation.navigate("Signup Screen");
  }

  // useEffect(() => {
  //   if (loginButtonPressed) {
  //     tryLogin();
  //   }
  // }, [loginButtonPressed]);

  return (
    <AuthComponent  typeScreen="login" onSubmit={tryLogin} onChangeTypeScreen={goToSignup} errorMessage={errorMessage}/>
  );
}

// const styles = StyleSheet.create({
  
// });
