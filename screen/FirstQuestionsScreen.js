import { View, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { Colors } from "../constant/Colors";
import { storeSplashData, storeUserSetting } from "../BackEnd/controllers/userData";
import UserStudyField from "../component/firstQuestionsComponents/UserStudyField";
import UserBacMean from "../component/firstQuestionsComponents/UserBacMean";
import { alertProvider } from "../BackEnd/errorHandler";
import {BrandComponent} from "../component/TopBar";
import NotCoveredField from "../component/firstQuestionsComponents/NotCoveredField";
import { disconnect } from "../BackEnd/controllers/setting";
import PrimaryButton from "../component/buttons/PrimaryButton";
import QuestionComponent from "../component/firstQuestionsComponents/QuestionComponent";

const screenNameList = ["yearNumber", "studyField"];
const questionList = [
  "Quelle est ta situation actuelle ?",
  "Selectionne ta filière",
];

const buttonLists = [
  [`Prépa 1re Année`, "Prépa 2ème Année", "Autre"],
  ["MP", "PC", "PSI", "Autre"]
]


export default function FirstQuestionsScreen({ navigation }) {
  const [studyField, setStudyField] = useState();
  const [bacMean, setBacMean] = useState("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("studyField");
  const [previousQuestion, setPreviousQuestion] = useState(null);
  const [screenToShow, setScreenToShow] = useState(null);


  // const [beforeOtherScreen, setBeforeOtherScreen] = useState(null);
  const [isNotCovered, setIsNotCovered] = useState(false);
  const [screenNumber, setScreenNumber] = useState(0);


  const dispatch = useDispatch();

  function resetNavigationScreen(screen) {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }


  // useEffect(()=> {

  // }, [screenNumber])


  useEffect(()=> {
    // switch (currentQuestion) {
    //   case "studyField" :
    //     setScreenToShow(<UserStudyField onPressField={onPressButton} />);
    //     setPreviousQuestion(null);
    //     break;
    //   case "userBacMean" :
    //     setScreenToShow(
    //       <UserBacMean
    //         bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber)}
    //         bacMean={bacMean}
    //         nextPressed={() => setAllQuestionsAnswered(true)}
    //       />
    //     );
    //     setPreviousQuestion("studyField");
    //     break;
    //   case "notCoveredField" :
    //     setScreenToShow(<NotCoveredField/>);
    //     setPreviousQuestion("studyField");
    //     break;
    // }

    if (screenNameList.length === screenNumber) {
      setScreenToShow(
        <UserBacMean
          bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber)}
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



  function onPressButton(buttonName) {
    if (buttonName==="Autre") {
      setIsNotCovered(true);
    } else {
      //! function backend
      setScreenNumber((number)=> number + 1);
      // setStudyField(buttonName);
      // setCurrentQuestion("userBacMean");
    }
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
        {/* <QuestionComponent/> */}
      </View>
      
    </View>
    );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor, 
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
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },

});
