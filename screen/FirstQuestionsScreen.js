import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";

import { Colors } from "../constant/Colors";
import {storeUserSetting} from "../BackEnd/controllers/userData";
import UserStudyField from "../component/firstQuestionsComponents/UserStudyField";
import UserBacMean from "../component/firstQuestionsComponents/UserBacMean";
import { alertProvider } from "../BackEnd/errorHandler";



function FirstQuestionsScreen({navigation}) {

  const [studyField, setStudyField] = useState();
  const [bacMean, setBacMean ] = useState();
  const [allQuestionsAnswered, setAllQuestionsAnswered ] = useState(false);

  const [screenToShow, setScreenToShow] = useState(
    <UserStudyField onPressField={onPressField} />
  );

  useLayoutEffect(() => {
    const resetOnFocus = navigation.addListener('focus', () => {
      setStudyField();
      setBacMean();
      setAllQuestionsAnswered(false);
      setScreenToShow(<UserStudyField onPressField={onPressField} />)
    });
    return resetOnFocus;
  }, [navigation]);

  function onPressField(field) {
    setStudyField(field);
    setScreenToShow(
      <UserBacMean
        bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber) } 
        bacMean={bacMean}
        nextPressed={() => setAllQuestionsAnswered(true) }
      />
    );
  }

  useEffect(() => {
    if (allQuestionsAnswered) {submitAnswers()} 
  }, [allQuestionsAnswered])

  async function submitAnswers() {
    setAllQuestionsAnswered(false);       // Au cas où il y a echec de la requete
    if (isNaN(bacMean) || bacMean < 0 || bacMean > 20) {
      Alert.alert(
        "Moyenne invalide !",
        "La moyenne doit être comprise entre 0 et 20",
        [{ text: "Ok", style: "destructive"}]
      );
    } else {
      const readyToGo = await storeUserSetting("ingenieur", studyField, bacMean);
      if (readyToGo) {
        navigation.setOptions({ initialRouteName: "Main Screens" });    //todo Verifier que ça fonctionne pour pas pouvoir revenir en arrière vers firstQuestions  
        navigation.navigate("Main Screens");
      } else {
        alertProvider(() => navigation.navigate("Login Screen"));
      }
      
    }
  }

  
  return (
    <View style={styles.mainContainer}>
      {screenToShow}
    </View>
  );
}

export default FirstQuestionsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    
    justifyContent: "center",
    alignItems: "center",
  },
});
