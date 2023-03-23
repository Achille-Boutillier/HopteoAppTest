import { FlatList, StyleSheet, View, ActivityIndicator, Text, Button, } from "react-native";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import Modal from "react-native-modal";


import {Colors} from "../constant/Colors";
import ScoreBar from "./ScoreBar";
import PrimaryButton from "./PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import SecondaryButton from "./SecondaryButton";


export default function SwipeLevel({absoluteIndex, minSwipeForRanking, progressBarColor, borderColor, mainBarColor}) {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);


  const [levelNumber, setLevelNumber] = useState();
  const [score, setScore] = useState();
  
  
  function calculNewScore() {
    const newLevel = parseInt(absoluteIndex/minSwipeForRanking) + 1;
    const newScore = parseInt( (absoluteIndex/minSwipeForRanking + 1 - newLevel) *100 );  // on tronque la valeur car on veut atteindre 100% que si on dépasse 99.99999....% 
    if (newLevel>levelNumber) {
      handleLevelModal();
    }
    setLevelNumber(newLevel);
    setScore(newScore);
  }

  useEffect(() => {
    // console.log(index);
    calculNewScore();
  }, [absoluteIndex])


  function handleLevelModal() {
    setIsModalVisible((bool) => (!bool));
  }

  function goToRanking() {
    // handleLevelModal();
    navigation.navigate("SchoolRanking");
  }

  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.mainScoreContainer}>
        <View style={[styles.levelNumberContainer, { backgroundColor: progressBarColor, borderColor: borderColor}]}>
          <Text style={[styles.levelNumberText, {color: Colors.white,}]}>{levelNumber}</Text>
        </View>
        <ScoreBar score={score} mainBarColor={mainBarColor} progressBarColor={progressBarColor} hideScoreNumber={true} borderColor={borderColor} /> 
      </View>

      <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalCross}>
            <PrimaryButton onPress={handleLevelModal} name="close-outline" size={60} color={Colors.orange500}/>
            </View>
            <View style={styles.modalBody}>
            <Text style={{fontSize:20, textAlign: 'center', width: "80%", marginTop: -20}}>Félicitation, un nouveau classement est disponible !!</Text>
            {/* <Text style={{fontSize:20, textAlign: 'center', marginHorizontal: 10, marginVertical: 20}}>Cliquez Ici pour découvrir votre classement d'école :</Text> */}
            {/* <PrimaryButton onPress={goToRanking} name="ribbon" size={60} color={Colors.orange500} /> */}
            <SecondaryButton onPress={goToRanking} fontSize={20} buttonText="Voir Le classement" preSized={false} />
            </View>
          </View>
      </Modal>

      
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    height: "10%",
    width: "80%",
    flexDirection: "column",
    marginRight: "2%",
    marginLeft: "2%",
    marginTop: "8%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  mainScoreContainer: {
    width: "80%",
    height: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  levelNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "15%",
    height: "100%",
    marginRight: "1%",
    // elevation: 3,
    // borderWidth: 0.7,
  },

  levelNumberText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },


  modal: {
    // flex: 1,
    height: "60%",
    width: "90%",
    backgroundColor: Colors.white,
    alignSelf: "center",
    borderRadius: 20,
  },
  modalCross: {
    // flex: 0.1,
    alignItems: "flex-end",
  },
  modalBody: {
    // borderWidth:1,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  
});