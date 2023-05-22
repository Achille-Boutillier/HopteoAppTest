import { useEffect, useState } from "react";
import {ScrollView} from "react-native";
import { signup, storeNewAuthData } from "../../BackEnd/controllers/userData";

import AuthComponent from "../../component/AuthComponent";
// import { ScrollView } from "react-native-gesture-handler";


export default function SignUp({ navigation, route }) {

  const [errorMessage, setErrorMessage] = useState();
  const [ischarging, setIscharging] = useState(false);

  function handleIsCharging(){
    setIscharging(true);
    setErrorMessage("");
  }

  async function trySignUp(email, password) {
    handleIsCharging();
    const signUpAnswer = await signup(email, password);
    if (signUpAnswer?.success) {
      setErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
      storeNewAuthData(signUpAnswer.authData);
      // resetNavigationScreen("OnBoardScreen");
      navigation.navigate("OnBoardScreen");
      // navigation.navigate("First Questions Screen");
    } else {
      if (signUpAnswer.errorMessage) {
        setErrorMessage(signUpAnswer.errorMessage);
      } else {
        setErrorMessage("Une erreur s'est produite");
      }
    }
    setIscharging(false);
  }


  function goToLogin() {
    setErrorMessage();
    navigation.navigate("Login Screen");
  }

  return (
    <AuthComponent typeScreen="signup" onSubmit={trySignUp} onChangeTypeScreen={goToLogin} errorMessage={errorMessage} ischarging={ischarging}/>
  );
}

// const styles = StyleSheet.create({
  
// });
