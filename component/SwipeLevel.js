import { FlatList, StyleSheet, View, TouchableOpacity,ToastAndroid, TouchableWithoutFeedback, ActivityIndicator, Text, Button, Platform} from "react-native";
import { useEffect, useState, useLayoutEffect, useRef, useCallback } from "react";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Sharing from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';
import * as Clipboard from 'expo-clipboard';
// import Clipboard from "react-native-clipboard";
// import * as FileSystem from 'expo-file-system';
// import { documentDirectory } from "expo-file-system";
// import Share from 'react-native-share'; 
// import { ShareSingleOptions } from "react-native-share";


import {Colors} from "../constant/Colors";
import ScoreBar from "./ScoreBar";
import PrimaryButton from "./buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
// import SecondaryButton from "./buttons/SecondaryButton";
import TerciaryButton from "./buttons/TerciaryButton";
import { alertProvider } from "../BackEnd/errorHandler";


export default function SwipeLevel({absoluteIndex, minSwipeForRanking, progressBarColor, mainBarColor, setIsUndoPress}) {
  const navigation = useNavigation();
  // console.log("[minSwipeForRanking ===============]", minSwipeForRanking);

  const [isNewRankModalVisible, setIsNewRankModalVisible] = useState(false);
  // const [isNewRankModalVisible, setIsNewRankModalVisible] = useState(false);
  const [isFirstRanking, setIsFirstRanking ] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible ] = useState(false);
  const [isCloseEnabled, setIsCloseEnabled ] = useState(false);



  const [levelNumber, setLevelNumber] = useState(0);
  const [score, setScore] = useState();
  const [isUndoDisabled, setIsUndoDisabled] = useState(false);
  
  function onPressUndo() {
    (()=>setIsUndoDisabled(true))();
    (()=>setIsUndoPress(true))();
    setTimeout(() => {
      setIsUndoDisabled(false);
    }, 400);

  }
  
  async function calculNewScore() {
    const shareAppPopupWasDisplayed = await getShareAppPopupWasDisplayed();
    console.log("[shareAppPopupWasDisplayed]", shareAppPopupWasDisplayed);
    const newLevel = parseInt(absoluteIndex/minSwipeForRanking) + 1;
    const newScore = parseInt( (absoluteIndex/minSwipeForRanking + 1 - newLevel) *100 );  // on tronque la valeur car on veut atteindre 100% que si on dépasse 99.99999....% 
    if (levelNumber>=1 && newLevel>levelNumber) {
      console.log("[newLevel]", newLevel);
    // if (newLevel>levelNumber) {
      setIsFirstRanking(newLevel===2);
      if (newLevel>=3) {
        shareAppPopupWasDisplayed ? handleNewRankModal() : handleShareModal() ;
      } else {
         handleNewRankModal();
      } 
    } 
    setLevelNumber(newLevel);
    setScore(newScore);
  }

  useEffect(() => {
    // console.log(index);
    calculNewScore();
  }, [absoluteIndex])



  async function handleNewRankModal() {
    setIsNewRankModalVisible((bool) => (!bool));
  }

  function goToRanking() {
    handleNewRankModal();
    navigation.navigate("SchoolRanking");
  }


  // ------------------ share app -------------------
  // const [status, requestPermission] = MediaLibrary.usePermissions();



  function handleShareModal() {
    setIsShareModalVisible((bool) => (!bool));
  }

  useEffect(()=> {
    if (isShareModalVisible) {
      setTimeout(() => {
        setIsCloseEnabled(true);
      }, 3000);
    } else {
      setIsCloseEnabled(false);
    }
  }, [isShareModalVisible])

  async function setShareAppPopupWasDisplayed(bool) {
    try {
      const shareAppPopupWasDisplayed = JSON.stringify(bool);
      // console.log('@shareAppPopupWasDisplayed---------------------------', shareAppPopupWasDisplayed);
      await AsyncStorage.setItem('@shareAppPopupWasDisplayed', shareAppPopupWasDisplayed);
    } catch (error) {
      console.log(error);
    }
  };

  // async function resetShareAppPopupWasDisplayed() {
  //   try {
  //     await AsyncStorage.removeItem('@shareAppPopupWasDisplayed');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function getShareAppPopupWasDisplayed() {
    try {
      const shareAppPopupWasDisplayed = await AsyncStorage.getItem('@shareAppPopupWasDisplayed');
      // console.log("[shareAppPopupWasDisplayed ---*******************---------]", shareAppPopupWasDisplayed);
      return shareAppPopupWasDisplayed ? Boolean(JSON.parse(shareAppPopupWasDisplayed)) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // const [data, setString] = useClipboard();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("https://linktr.ee/hopteo");
  };
  
  // function getAppUrl() {
  //   let url;
  //   if (Platform.OS === "ios") {
  //     url = "https://apps.apple.com/my/app/hopteo/id6447057343";
  //   }  else if (Platform.OS === "android") {
  //     url = "https://play.google.com/store/apps/details?id=com.hopteo.hopteoApp" ;
  //   } else {
  //     url = "https://linktr.ee/hopteo" ;
  //   }
  //   return url;
  // }

  // async function shareApp() {
  //   const url = "https://linktr.ee/hopteo" ;
  //   // const imageURI = require("../assets/images/sharingAppImage.jpeg");
  //   const imageURI = documentDirectory + "assets/images/sharingAppImage.jpeg";
  //   console.log(imageURI)
  //   const message = `Télécharge Hopteo, l'application qui aide les prépa scientifiques à trouver leur école d'ingénieur : \n ${url}`;
  //   const sharingOptions = {
  //     dialogTitle: message,
  //     // url: require("../assets/images/sharingAppImage.png"),
  //   };
  //   // handleShareModal();
  //   try {
  //   // const [status] = MediaLibrary.usePermissions();
      
  //   console.log(status);
  //   if (!status.granted) {
  //     const {granted} = await requestPermission(); 
  //     // const { granted } = await MediaLibrary.requestPermissionsAsync();

      
  //     // granted ? await Sharing.shareAsync(imageURI, sharingOptions) : alertProvider("Impossible de partager sans modifier les autorisations du smartphone.");
  //     granted ? await Sharing.shareAsync(imageURI) : alertProvider("Impossible de partager sans modifier les autorisations du smartphone.");
  //   } else {
  //     await Sharing.shareAsync(imageURI);
  //     // await Sharing.shareAsync(imageURI, sharingOptions);
  //   }
      
  //   } catch (error) {
  //     console.log(error);
  //     alertProvider("Impossible de partager l'application ");
  //   }
  // }

  // ! ----------- marche encore moins celle là :
  // async function shareApp() {
  //   url = "https://linktr.ee/hopteo"
  //   const message = "Télécharge Hopteo, l'application qui aide les prépa scientifiques à trouver leur école d'ingénieur";
  //   // handleShareModal();
  //   try {

  //     // await Sharing.shareAsync(message);
  //     // await Share.open({ message });
  //     await shareSingle({message})
  //   } catch (error) {
  //     console.log(error);
  //     alertProvider("Impossible de partager l'application ");
  //   }
  // }

  // ! -------------------------

  async function closeShareAppPopup() {
    handleShareModal();
    await setShareAppPopupWasDisplayed(true);
    // await resetShareAppPopupWasDisplayed();
  }

  // ------------------------ fin share app ---------------------------------

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
          disabled={isUndoDisabled}
        />

      <Modal isVisible={isNewRankModalVisible}>
          <View style={styles.modal}>
            { isFirstRanking 
              ? null 
              : (
                <View style={styles.modalCross}>
                  <PrimaryButton onPress={handleNewRankModal} name="close-outline" size={60} color={Colors.orange500}/>
                </View>
              ) 
            }
            <View style={styles.modalBody}>
            <Text style={{fontSize:20, textAlign: 'center', width: "80%"}}>
              { isFirstRanking ? "Félicitations, ton premier classement est disponible !!" : "Ton classement d'écoles a changé ! \n \n Ça mérite un p'tit coup d'œil 😉 "}
            </Text>
            <TerciaryButton title="Voir le classement" onPress={goToRanking} color={Colors.orange500} isFullColor={true} fontSize={20} />
            </View>
          </View>
      </Modal>




      <Modal isVisible={isShareModalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalCross}>
              {/* <WaitingBar totalWaitingTime = {3000}/> */}
              { isCloseEnabled 
                ? <PrimaryButton onPress={closeShareAppPopup} name="close-outline" size={60} color={Colors.orange500}/>
                : null
                // : <WaitingBar totalWaitingTime = {3000}/>
              }
            </View>
            <View style={styles.modalBody}>
            <Text style={{fontSize:20, textAlign: 'center', width: "80%"}}>
              {"L'appli a l'air de te plaire ! \n \n Partage ce lien pour soutenir hopteo 😉"}
            </Text>
            <TouchableOpacity style={{borderRadius: 5, backgroundColor: Colors.grey300, paddingHorizontal: 10, paddingVertical: 5}} onPress={copyToClipboard}>
              <Text style={{fontSize:15, textAlign: 'center', width: "80%"}}>
                {"https://linktr.ee/hopteo"}
              </Text>
            </TouchableOpacity>
            
            <TerciaryButton title="Copier le lien" onPress={copyToClipboard} color={Colors.orange500} isFullColor={true} fontSize={20} />
            </View>
          </View>
      </Modal>

    </View>
  );
}

// function WaitingBar({totalWaitingTime}) {

//   const [currentTime, setCurrentTime] = useState(0);
//   const [progressBarSize, setProgressBarSize ] = useState("0%");

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentTime(prevTime => prevTime + 100);
//     }, 100);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(()=> {
//     const width = (100*currentTime/totalWaitingTime).toString()+"%" ;
//     setProgressBarSize(width) ;
//   }, [currentTime])




  // return (
  //   <View style={{width: "90%", height: 10, borderWidth: 1}}>
  //     <View style={{width: progressBarSize , height: "100%", backgroundColor: Colors.orange500 }}></View>
  //   </View>
  // );
// };




const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth:1,
    // flex: 0,
    height: 35,
    width: "90%",
    flexDirection: "row",
    marginVertical: "5%",
    alignItems: "center",
    // justifyContent: "space-between",
    alignSelf: "center",
  },
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
    top: 0,
    right: 0,
    // left: 5,
    // alignItems: "flex-end",
    position: "absolute",
    zIndex: 2,
  },
  modalBody: {
    // borderWidth:1,
    marginTop: 30,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  
});