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


function FirstQuestionsScreen({ navigation }) {
  const [studyField, setStudyField] = useState();
  const [bacMean, setBacMean] = useState("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("studyField");

  const [screenToShow, setScreenToShow] = useState(<UserStudyField onPressField={onPressField} />);
  const [previousQuestion, setPreviousQuestion] = useState(null);

  const dispatch = useDispatch();

  function resetNavigationScreen(screen) {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }

  useEffect(()=> {
    switch (currentQuestion) {
      case "studyField" :
        setScreenToShow(<UserStudyField onPressField={onPressField} />);
        setPreviousQuestion(null);
        break;
      case "userBacMean" :
        setScreenToShow(
          <UserBacMean
            bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber)}
            bacMean={bacMean}
            nextPressed={() => setAllQuestionsAnswered(true)}
          />
        );
        setPreviousQuestion("studyField");
        break;
      case "notCoveredField" :
        setScreenToShow(<NotCoveredField/>);
        setPreviousQuestion("studyField");
        break;
    }
  }, [currentQuestion])




  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStudyField();
      setBacMean();
      setAllQuestionsAnswered(false);
      setPreviousQuestion(null);
      setCurrentQuestion("studyField");
    });
    return unsubscribe;
  }, [navigation]);




  function onBackPress() {
    if (previousQuestion) {
      setCurrentQuestion(previousQuestion);
    } else {
      disconnect();
      resetNavigationScreen("Login Screen");
      // navigation.navigate("Login Screen");
    }
  }



  function onPressField(field) {
    if (field==="Autre") {
      setCurrentQuestion("notCoveredField");
      // setScreenToShow(<NotCoveredField/>);
    } else {
      setStudyField(field);
      setCurrentQuestion("userBacMean");
    //   setScreenToShow(
    //     <UserBacMean
    //       bacMeanInputHandler={(enteredNumber) => setBacMean(enteredNumber)}
    //       bacMean={bacMean}
    //       nextPressed={() => setAllQuestionsAnswered(true)}
    //     />
    // );
    }
    
  }

  useEffect(() => {
    if (allQuestionsAnswered) {
      submitAnswers();
    }
  }, [allQuestionsAnswered]);



  async function submitAnswers() {
    setAllQuestionsAnswered(false); // Au cas où il y a echec de la requete
    if (isNaN(bacMean) || bacMean < 0 || bacMean > 20) {
      Alert.alert(
        "Moyenne invalide !",
        "La moyenne doit être comprise entre 0 et 20",
        [{ text: "Ok", style: "destructive" }]
      );
    } else {
      
      const data = await storeUserSetting("ingenieur", studyField, bacMean);
      if (data.success) {
        storeSplashData(data.splashData, dispatch);
        navigation.setOptions({ initialRouteName: "Main Screens" }); //todo Verifier que ça fonctionne pour pas pouvoir revenir en arrière vers firstQuestions
        // navigation.navigate("Main Screens");
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
        <BrandComponent logoSize={30} fontSize={17}/>
      </View>
      <View style={styles.bodyContainer}>
        {/* <BrandComponent/> */}
        {screenToShow}
      </View>
      
    </View>
    );
}

export default FirstQuestionsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor, 
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: "6%",
    // borderWidth: 1,
  },
  backButtonContainer: {
    position: "absolute",
    left: "6%",
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    // alignItems: "center",
  },

});
