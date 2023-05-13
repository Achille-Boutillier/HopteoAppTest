import { FlatList, StyleSheet, View, ActivityIndicator, Text, Button, } from "react-native";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import Modal from "react-native-modal";


import {Colors} from "../constant/Colors";
import ScoreBar from "./ScoreBar";
import PrimaryButton from "./buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
// import SecondaryButton from "./buttons/SecondaryButton";
import TerciaryButton from "./buttons/TerciaryButton";


export default function SwipeLevel({absoluteIndex, minSwipeForRanking, progressBarColor, mainBarColor, onPressUndo}) {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);


  const [levelNumber, setLevelNumber] = useState();
  const [score, setScore] = useState();
  
  
  function calculNewScore() {
    const newLevel = parseInt(absoluteIndex/minSwipeForRanking) + 1;
    const newScore = parseInt( (absoluteIndex/minSwipeForRanking + 1 - newLevel) *100 );  // on tronque la valeur car on veut atteindre 100% que si on dépasse 99.99999....% 
    if (newLevel>levelNumber && newLevel===2) {
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
    handleLevelModal();
    navigation.navigate("SchoolRanking");
  }

  return (
    <View style={styles.mainContainer}>
      
      <View style={[styles.levelNumberContainer, { backgroundColor: progressBarColor}]}>
        <Text style={[styles.levelNumberText, {color: Colors.white,}]}>{levelNumber}</Text>
      </View>

      <ScoreBar score={score} mainBarColor={mainBarColor} progressBarColor={progressBarColor} hideScoreNumber={true} /> 
        <PrimaryButton
          onPress={onPressUndo}
          // onPress={()=>{}}
          name="arrow-undo-circle"
          size={30}
          color={Colors.orange500}
        />

      <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalCross}>
            <PrimaryButton onPress={handleLevelModal} name="close-outline" size={60} color={Colors.orange500}/>
            </View>
            <View style={styles.modalBody}>
            <Text style={{fontSize:20, textAlign: 'center', width: "80%", marginTop: -20}}>Félicitation, un nouveau classement est disponible !!</Text>
            {/* <Text style={{fontSize:20, textAlign: 'center', marginHorizontal: 10, marginVertical: 20}}>Cliquez Ici pour découvrir votre classement d'école :</Text> */}
            {/* <PrimaryButton onPress={goToRanking} name="ribbon" size={60} color={Colors.orange500} /> */}
            <TerciaryButton title="Voir le classement" onPress={goToRanking} color={Colors.orange500} isFullColor={true} fontSize={20} />
            {/* <SecondaryButton onPress={goToRanking} fontSize={20} buttonText="Voir le classement" preSized={false} /> */}
            </View>
          </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth:1,
    // flex: 0,
    height: 35,
    width: "90%",
    flexDirection: "row",
    // marginTop: "8%",
    alignItems: "center",
    // justifyContent: "space-between",
    alignSelf: "center",
  },

  // mainScoreContainer: {
  //   width: "100%",
  //   // flex: 1,
  //   height: 28,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderWidth: 1,
  // },
  levelNumberContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "80%",
    // marginRight: "1%",

    paddingHorizontal: 10,
    // elevation: 3,
    // borderWidth: 0.7,
  },

  levelNumberText: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    verticalAlign: "middle",
  },

  modal: {
    height: "60%",
    width: "90%",
    backgroundColor: Colors.backgroundColor,
    alignSelf: "center",
    borderRadius: 20,
  },
  modalCross: {
    alignItems: "flex-end",
  },
  modalBody: {
    // borderWidth:1,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  
});