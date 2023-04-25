import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { Colors } from "../constant/Colors";
import { storeUserSetting } from "../BackEnd/controllers/userData";
import UserStudyField from "../component/firstQuestionsComponents/UserStudyField";
import UserBacMean from "../component/firstQuestionsComponents/UserBacMean";
import { alertProvider } from "../BackEnd/errorHandler";
import {getUserSettingFailure, getUserSettingRequest, getUserSettingSuccess} from "../core/reducers/userSettingReducer";
import { splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure } from "../core/reducers/swipeReducer";
import { getThemeRequest, getThemeSuccess, getThemeFailure } from "../core/reducers/themeReducer";
import { splashRequest } from "../BackEnd/controllers/userData";

function FirstQuestionsScreen({ navigation }) {
  const [studyField, setStudyField] = useState();
  const [bacMean, setBacMean] = useState();
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const [screenToShow, setScreenToShow] = useState(
    <UserStudyField onPressField={onPressField} />
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStudyField();
      setBacMean();
      setAllQuestionsAnswered(false);
      setScreenToShow(<UserStudyField onPressField={onPressField} />);
    });
    return unsubscribe;
  }, [navigation]);

  function onPressField(field) {
    setStudyField(field);
    setScreenToShow(
      <UserBacMean
        bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber)}
        bacMean={bacMean}
        nextPressed={() => setAllQuestionsAnswered(true)}
      />
    );
  }

  useEffect(() => {
    if (allQuestionsAnswered) {
      submitAnswers();
    }
  }, [allQuestionsAnswered]);


  async function storeSplashData() {
    const splashData = await splashRequest();
    if (splashData.error) {
      setErrorMessage(splashData.error);
      dispatch(getThemeFailure("splashRequest failed"));
      dispatch(getUserSettingFailure("splashRequest failed"));
      dispatch(splashSwipeFailure("splashRequest failed"));
    } else {
      const {themeObj, filiere, secondYearFiliere, answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj } = splashData
      const cursusType = "ingenieur";
      dispatch(getThemeSuccess(themeObj));
      dispatch(getUserSettingSuccess({filiere, secondYearFiliere, cursusType }));
      dispatch(splashSwipeSuccess( {answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj: {} } ));
      console.log("themeObj : ", store.getState().themeReducer); // .themeReducer.theme pour avoir que l'objet
      navigation.navigate("Main Screens");
    }
  }

  async function submitAnswers() {
    setAllQuestionsAnswered(false); // Au cas où il y a echec de la requete
    if (isNaN(bacMean) || bacMean < 0 || bacMean > 20) {
      Alert.alert(
        "Moyenne invalide !",
        "La moyenne doit être comprise entre 0 et 20",
        [{ text: "Ok", style: "destructive" }]
      );
    } else {
      
      const success = await storeUserSetting("ingenieur", studyField, bacMean);
      if (success) {
        storeSplashData().then(()=> {
          navigation.setOptions({ initialRouteName: "Main Screens" }); //todo Verifier que ça fonctionne pour pas pouvoir revenir en arrière vers firstQuestions
          navigation.navigate("Main Screens");
        })
       
      } else {
        
        alertProvider();
      }
    }
  }

  return <View style={styles.mainContainer}>{screenToShow}</View>;
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
