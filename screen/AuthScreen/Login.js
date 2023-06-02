import { useEffect } from "react";
import { useState } from "react";

import { login, storeNewAuthData, storeSplashData } from "../../BackEnd/controllers/userData";
import { useDispatch } from "react-redux";

import AuthComponent from "../../component/AuthComponent";
import ActivityComponent from "../../component/ActivityComponent";


export default function Login({ navigation }) {
  
  const [errorMessage, setErrorMessage] = useState();
  const [ischarging, setIscharging] = useState(false);

  const dispatch = useDispatch();

  function resetNavigationScreen(screen) {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }

  function handleIsCharging(){
    setIscharging(true);
    setErrorMessage("");
  }

  function isUserInputReadyToSubmit(email, password) {
    if (email==="" || password==="") {
      setErrorMessage("Un des champs n'est pas rempli");
      return false;
    } else {
      return true;
    }
  }

  async function tryLogin(email, password) {
    if (!isUserInputReadyToSubmit(email, password)) {
      setIscharging(false);
      return;
    }

    handleIsCharging();
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
      resetNavigationScreen(nextScreen);
    } else {
      if (loginAnswer.errorMessage) {
        setErrorMessage(loginAnswer.errorMessage);
      } else {
        setErrorMessage("Echec de la tentative de connexion");
      }
    }
    setIscharging(false);
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
    <>
      <AuthComponent typeScreen="login" onSubmit={tryLogin} onChangeTypeScreen={goToSignup} errorMessage={errorMessage} ischarging={ischarging}/>
      {ischarging ? <ActivityComponent/> : null}
    </>

  );
}

// const styles = StyleSheet.create({
  
// });
