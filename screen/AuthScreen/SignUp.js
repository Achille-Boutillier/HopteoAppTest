import { useEffect, useState } from "react";
import {ScrollView} from "react-native";
import { signup, storeNewAuthData } from "../../BackEnd/controllers/userData";

import AuthComponent from "../../component/AuthComponent";
import ActivityComponent from "../../component/ActivityComponent";
import { storeAllFiliereList } from "../../core/reducers/userSettingReducer";
// import { ScrollView } from "react-native-gesture-handler";


export default function SignUp({ navigation, route }) {

  const [errorMessage, setErrorMessage] = useState();
  const [ischarging, setIscharging] = useState(false);

  function handleIsCharging(){
    setIscharging(true);
    setErrorMessage("");
  }

  function isUserInputReadyToSubmit(email, password) {
    if (email==="" || password==="") {
      setErrorMessage("Tous les champs doivent être remplis");
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Le format de l'email est invalide");
      return false
    } else {
      return true;
    }
  }

  async function trySignUp(email, password) {
    handleIsCharging();
    if (!isUserInputReadyToSubmit(email, password)) {
      setIscharging(false);
      return;
    } 

    const signUpAnswer = await signup(email, password);
    if (signUpAnswer?.success) {
      setErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
      storeNewAuthData(signUpAnswer.authData);
      storeAllFiliereList(signUpAnswer.filiereList);
      navigation.navigate("OnBoardScreen");
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
    <>
      <AuthComponent typeScreen="signup" onSubmit={trySignUp} onChangeTypeScreen={goToLogin} errorMessage={errorMessage} ischarging={ischarging}/>
      {ischarging ? <ActivityComponent/> : null}
    </>
  );
}

// const styles = StyleSheet.create({
  
// });
