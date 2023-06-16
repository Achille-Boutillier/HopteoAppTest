import { useEffect } from "react";
import { useState } from "react";

import { login, storeNewAuthData, storeSplashData } from "../../BackEnd/controllers/userData";
import { useDispatch } from "react-redux";
import validator from "validator";

import AuthComponent from "../../component/AuthComponent";
import ActivityComponent from "../../component/ActivityComponent";
import { storeAllFiliereList } from "../../core/reducers/userSettingReducer";


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
    } else if (!validator.isEmail(email)) {
      setErrorMessage("Le format de l'email est invalide");
      return false
    } else {
      return true;
    }
  }


  function handleSplashData(data) {
    let nextScreen;
    if (data.userSettingStatus) {
      storeSplashData(data.splashData, dispatch);
      nextScreen = "Main Screens";

      // navigation.navigate("Main Screens");
    } else {
      dispatch(storeAllFiliereList(data.filiereList));
      nextScreen = "First Questions Screen";
    }
    resetNavigationScreen(nextScreen);
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
      handleSplashData(loginAnswer);
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


  return (
    <>
      <AuthComponent typeScreen="login" onSubmit={tryLogin} onChangeTypeScreen={goToSignup} errorMessage={errorMessage} ischarging={ischarging}/>
      {ischarging ? <ActivityComponent/> : null}
    </>

  );
}

// const styles = StyleSheet.create({
  
// });
