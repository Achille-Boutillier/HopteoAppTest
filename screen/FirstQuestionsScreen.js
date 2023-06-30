import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { Colors } from "../constant/Colors";
import { storeSplashData, storeUserSetting, storeUserStudyYear } from "../BackEnd/controllers/userData";
import UserStudyField from "../component/firstQuestionsComponents/UserStudyField";
import UserBacMean from "../component/firstQuestionsComponents/UserBacMean";
import { alertProvider } from "../BackEnd/errorHandler";
import {BrandComponent} from "../component/TopBar";
import NotCoveredField from "../component/firstQuestionsComponents/NotCoveredField";
import { disconnect } from "../BackEnd/controllers/setting";
import PrimaryButton from "../component/buttons/PrimaryButton";
import QuestionComponent from "../component/firstQuestionsComponents/QuestionComponent";
import { trackingFunction } from "../BackEnd/googleAnalyticsTracker";
import { trackingDesignation } from "../constant/trakingDesignation";



export default function FirstQuestionsScreen({ navigation }) {
  const [studyField, setStudyField] = useState();
  const [bacMean, setBacMean] = useState();
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  
  const [screenToShow, setScreenToShow] = useState(null);


  // const [beforeOtherScreen, setBeforeOtherScreen] = useState(null);
  const [isNotCovered, setIsNotCovered] = useState(false);
  const [screenNumber, setScreenNumber] = useState(0);
  
  const screenNameList = ["situation", "studyYear", "studyField"];
  const questionList = [
    "Quelle est ta situation actuelle ?",
    "En quelle année es-tu ?",
    "Selectionne ta filière",
  ];
  const [buttonLists, setButtonLists] = useState([
    ["Prépa Scientifique", "Autre"],
    ["1ᵉ Année", "2ᵉ Année"]
  ]);

  const dispatch = useDispatch();

  function resetNavigationScreen(screen) {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }



  useEffect(()=> {

    if (screenNumber===screenNameList.length) {
      setScreenToShow(
        <UserBacMean
          bacMeanInputHandler={(enteredNumber) => {setBacMean(enteredNumber)}}
          bacMean={bacMean}
          nextPressed={() => setAllQuestionsAnswered(true)}
        />
      );
    } else {
      setScreenToShow(<QuestionComponent onPressField={onPressButton} question={questionList[screenNumber]} buttonList={buttonLists[screenNumber]}/>)
    }

  }, [screenNumber])




  // useLayoutEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setStudyField();
  //     setBacMean();
  //     setAllQuestionsAnswered(false);
  //     setPreviousQuestion(null);
  //     setCurrentQuestion("studyField");
  //   });
  //   return unsubscribe;
  // }, [navigation]);




  function onBackPress() {
    if (isNotCovered) {
      setIsNotCovered(false);
    } else if (screenNumber===0) {
      disconnect();
      resetNavigationScreen("Login Screen");
      // navigation.navigate("Login Screen");
    } else {
      setScreenNumber((number) => number - 1);
    }
  }



  async function onPressButton(buttonName) {
    if (buttonName==="Autre") {
      setIsNotCovered(true);
      return; 
    } 

    // si pas "Autre"
    if (screenNameList[screenNumber]==="studyYear") {
      const answer = await storeUserStudyYear("ingenieur", parseInt(buttonName[0]))
      !answer.success 
        ? alertProvider("L'enregistement des données a échoué")
        : (
          setButtonLists((list)=> [...list, answer.fieldList])
        ) ;
    } else if (screenNameList[screenNumber]==="studyField") {
      setStudyField(buttonName);
    }
    //! function backend
    setScreenNumber((number)=> number + 1);
    // setCurrentQuestion("userBacMean");
  }


  useEffect(() => {
    if (allQuestionsAnswered) {
      submitAnswers();
    }
  }, [allQuestionsAnswered]);



  async function submitAnswers() {
    setAllQuestionsAnswered(false); // Au cas où il y a echec de la requete
    const bacMeanNumber = parseFloat(bacMean.replace(",", "."));
    if (isNaN(bacMeanNumber) || bacMeanNumber < 0 || bacMeanNumber > 22) {
      Alert.alert(
        "Moyenne invalide !",
        "La moyenne doit être comprise entre 0 et 22",
        [{ text: "Ok", style: "destructive" }]
      );
    } else {
      
      const data = await storeUserSetting("ingenieur", studyField, bacMeanNumber);
      if (data.success) {
        storeSplashData(data.splashData, dispatch);
        trackingFunction(trackingDesignation.actionName.userData, trackingDesignation.pageTitle.firstQuestionScreen, {event_category: trackingDesignation.eventCategory.account, event_label: studyField, event_action: trackingDesignation.eventAction.enteredText });

        resetNavigationScreen("Main Screens");
      } else {
        alertProvider();
      }
    }
  }

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <PrimaryButton
            onPress={onBackPress}
            name="arrow-back"
            size={28}
            color={Colors.orange500}
          />
        </View>
        <BrandComponent />
      </View>
      
      <View style={styles.bodyContainer}>
        {isNotCovered 
          ? <NotCoveredField/>
          : screenToShow
        }
      </View>
      
    </View>
    );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor, 
    // width: "100%",
    // borderWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: "6%",
    marginTop: "5%",
    // borderWidth: 1,
  },
  backButtonContainer: {
    position: "absolute",
    left: "6%",
  },
  bodyContainer: {
    flex: 1,
  },

});
