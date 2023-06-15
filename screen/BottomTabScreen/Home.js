import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, Alert, Dimensions, AppState, Platform, Linking } from "react-native";
// import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect, useLayoutEffect, createRef, useRef  } from "react";
// import VersionCheck from 'react-native-version-check-expo';
// import VersionCheck from "react-native-version-check";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Swiper from "react-native-deck-swiper";

import Card from "../../component/Card";
import { Colors } from "../../constant/Colors";
import { HeaderButton } from "../../component/TopBar";
import {nextPile} from "../../BackEnd/controllers/cards";
import SwipeLevel from "../../component/SwipeLevel";
import { alertProvider } from "../../BackEnd/errorHandler";
import MessageContainer from "../../component/MessageContainer";
import { storeNewSwipe, removeSwipe, setSwipeStateHasChanged } from "../../core/reducers/swipeReducer";
import SwipeButton from "../../component/buttons/SwipeButton";
import { updateBackData } from "../../BackEnd/updateBackData";
import ActivityComponent from "../../component/ActivityComponent";
import store from "../../core";
// import store from "../../core";
const swiperRef = createRef();

const deviceHeight = Dimensions.get("window").height;
const swipeCardHeigth = 0.52*deviceHeight;


export default function Home({ navigation, route }) {
  // const screenParams = route.params;
  const themeState = useSelector((state) => state.themeReducer.themeObj);
  const swipeReducer = useSelector(state => state.swipeReducer);
  const [latestSwipeReducer, setLatestSwipeReducer] = useState(swipeReducer);

  useEffect(()=> {
    setLatestSwipeReducer(swipeReducer);
  }, [swipeReducer])

 
  const dispatch = useDispatch();

  const [theme, setTheme] = useState();
  const [listIndex, setListIndex] = useState(); // listIndex = indice relatif à "cardList"
  const [absoluteIndex, setAbsoluteIndex] = useState(); // index total en comptant toutes les cartes

  const [isPileOver, setIsPileOver] = useState(true); // true car necessite un chargement initial

  const [isCardListLoaded, setIsCardListLoaded] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [allCardsPile, setAllCardsPile] = useState([]);
  
  // const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [swipeButtonZIndex, setSwipeButtonZIndex] = useState(2);
  const [swipeDir, setSwipeDir] = useState(null);
  const [isUndoPress, setIsUndoPress] = useState(false);

  

  // ----------- pop up mise a jour ----------------------------------------------------
  async function checkAppVersion() {
    const {lastAppVersion, currentAppVersion} = store.getState().userSettingReducer;
    const lastVersionNumber = parseInt(lastAppVersion.slice(-2));
    const currentVersionNumber = parseInt(currentAppVersion.slice(-2));

    if (lastVersionNumber > currentVersionNumber) {
      Alert.alert(
        "Mise à jour disponible",
        "Une nouvelle version de l'application est disponible. Veux-tu la mettre à jour ?",
        [
          {
            text: 'Mettre à jour',
            onPress: () => redirectToStoreForUpdate()
          },
          {
            text: 'Plus tard',
            style: 'cancel',
          },
        ],
        {cancelable: false }
      );
    }
  };


  function redirectToStoreForUpdate() {
    if (Platform.OS === "ios") {
      Linking.openURL("https://apps.apple.com/my/app/hopteo/id6447057343");
    }  else if (Platform.OS === "android") {
      Linking.openURL("https://play.google.com/store/apps/details?id=com.hopteo.hopteoApp" );
    } else {
      Linking.openURL("https://linktr.ee/hopteo" );
    }
  }

  useEffect(() => {
    checkAppVersion();
  }, []);


  // --------------------------fin pop up maj ---------------------------------------------------------

  // ------------ upgrade backEnd Data if app goes on background -----------------------

  const [appState, setAppState] = useState("active");

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);
 
 
  useEffect(()=> {
    if (appState!=="active") {
      updateBackData(dispatch); 
    }
  }, [appState])
 
   // ----------- fin upgrade backEnd Data -------------------------




  useEffect(() => {
    // console.log("[params]" , route.params);
    if (route.params?.jumpToFirstCard) {
      console.log("[reset card ?]" , route.params?.jumpToFirstCard);
      const nextIdCardList = calculNextCardsToAsk();
      getCards(nextIdCardList);
    }
  }, [route.params]);
  

  useEffect(() => {
    setTheme(themeState);

  }, [themeState]);

  
// ========= gestion cartes swipe ================================

  function unableCard() {
    setIsCardListLoaded(false);
  }

  async function getCards(nextIdCardList) {
    setIsPileOver(false);
    if (nextIdCardList.length===0) {
      setCardList("Tu as swipé toutes les cartes disponibles. \nNos équipes travaillent pour t'en proposer d'autres");
      setIsCardListLoaded(true);
      return
    }
    console.log("[idCardList]", nextIdCardList);
    unableCard();
    const data = await nextPile(nextIdCardList);
    console.log("Je passe dans getCards");
    setAllCardsPile((pile) => pile.concat(data.cardsPile)); 
    if (data.cardsPile) {
      setListIndex(0);
      setCardList(data.cardsPile);
      setIsCardListLoaded(true);  
    } else {
      alertProvider(data.error);
    } 
  }


  function calculNextCardsToAsk() {
    const answeredCards = Object.keys(latestSwipeReducer.swipeTypeObj);
    const notAnsweredCards = latestSwipeReducer.idCardsList.filter(item => !(answeredCards.includes(item)));
    return notAnsweredCards.slice(0,latestSwipeReducer.minSwipeForRanking);
    // return notAnsweredCards.slice(0,13);
  }

  useEffect(() => {
    if (isPileOver) {
      const nextIdCardList = calculNextCardsToAsk();
      console.log("[nextIdCardList]", nextIdCardList);
      // console.log("[DUPLICATS ===== ]", findDuplicate(nextIdCardList));
      getCards(nextIdCardList);
    }
  }, [isPileOver]);



  //================= handle header buttons =======================================

  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<HeaderButton onSettingsPress={onSettingsPress} />),
    });
  }, [navigation]);

  //================== handle undo ==========================================================


  async function getPreviousCard(){
    const {notSentToBackAnswers, sentToBackAnswers} = latestSwipeReducer;
    // console.log("[notSentToBackAnswers]", notSentToBackAnswers);
    // console.log("[sentToBackAnswers]", sentToBackAnswers);
    let previousCardId;
    if (notSentToBackAnswers.length===0){
      previousCardId = sentToBackAnswers[sentToBackAnswers.length-1];
    } else {
      previousCardId = notSentToBackAnswers[notSentToBackAnswers.length-1];
    }

    const {cardsPile, error} = await nextPile([previousCardId]);
    if (cardsPile) {
      const {id, idTheme} = cardsPile[0];
      dispatch(removeSwipe({id, idTheme}));
      // const newCardList = cardList;
      // newCardList.unshift(cardsPile[0]);      // add an element to the biginning of newCardList (return length de la nouvelle liste)
      // const undoSuccess = await undoSwipe(id, idTheme, dispatch);
      setCardList((previousList) => [cardsPile[0], ...previousList]);
        
    } else {
      alertProvider(error);
    }
  }

  async function goToPreviousCard() {
    const index = listIndex;
    const {id, idTheme} = cardList[index-1];
    swiperRef.current.jumpToCardIndex(index - 1); 
    setListIndex(index - 1);
    dispatch(removeSwipe({id, idTheme}));
    // const undoSuccess = await undoSwipe(id, idTheme, dispatch);
    // if (!undoSuccess) {
    //   swiperRef.current.jumpToCardIndex(index);
    //   setListIndex(index);
    //   alertProvider("Impossible de revenir en arrière pour le moment");
    // }
  }


  function handleUndoPress() {
    if (absoluteIndex === 0) {
      Alert.alert("Impossible !", "Tu te trouves déjà sur la première carte", [
        { text: "Ok", style: "cancel" },
      ]);
    } else {

      if (listIndex === 0) {
        getPreviousCard();
      } else {
        goToPreviousCard();
      }

      if (!latestSwipeReducer.swipeStateHasChanged){
        dispatch(setSwipeStateHasChanged(true));
      }

    }
  }

  useEffect(() => {
    if (isUndoPress) {
      handleUndoPress();
      setIsUndoPress(false);
    }
  }, [isUndoPress]);


  // ============= handle Swipe =======================================================

  async function onSwiped(index, swipeType) {
    console.log(`[swiper index] ${index}`);
    // console.log("[current Card] ", cardList[index]);
    const idTheme = cardList[index].idTheme
    const id = cardList[index].id;         
    console.log( "[id swipe ]" ,id);
    setListIndex(index + 1);
    dispatch(storeNewSwipe({id, swipeType, idTheme}));
    if (!latestSwipeReducer.swipeStateHasChanged){
      dispatch(setSwipeStateHasChanged(true));
    }
    // const isSuccessfull = await swipeHandler(id, swipeType);
    // if (!isSuccessfull) {
    //   dispatch(removeSwipe({id, idTheme}));
    //   alertProvider("Le swipe n'a pas été pris en compte")
    // }
  }


  useEffect(() => {
    length = Object.keys(latestSwipeReducer.swipeTypeObj).length;
    // console.log(length);
    // console.log("[absoluteIndex]", length);
    setAbsoluteIndex(length);
  }, [latestSwipeReducer.swipeTypeObj]);

// ==================position de la carte===================================

function onSwiping(x, y){
  let direction;
  if (Math.abs(x) > Math.abs(y) && x > 40) {
    direction = "like";
  } else if (Math.abs(x) > Math.abs(y) && x < -40) {
    direction = "dislike";
  } else if (Math.abs(y) > Math.abs(x) && y > 70) {
    direction = "dontKnow";
  } else if (Math.abs(y) > Math.abs(x) && y < -70) {
    direction = "superLike";
  } else {
    direction = null;
  }
  setSwipeDir(direction);
}

  function onSwipedAll() {
    setTimeout(() => {
      setIsPileOver(true);
    }, 300);
  }

  // ---------- méthodes relatives au swipe ----------------------

  // () => swiperRef.current.jumpToCardIndex(newIndex);
  // () => swiperRef.current.swipeBack();

  //------------------------------------------

  // useEffect(()=> {
  //   resetShareAppPopupWasDisplayed();
  // }, [absoluteIndex])

  // async function resetShareAppPopupWasDisplayed() {
  //   try {
  //     await AsyncStorage.removeItem('@shareAppPopupWasDisplayed');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
    return (
      <View style={styles.mainContainer}>

        <SwipeLevel
          absoluteIndex={absoluteIndex}
          minSwipeForRanking={latestSwipeReducer.minSwipeForRanking} // 'pas' des levels
          progressBarColor={"#70DDFF"}
          // borderColor={null}
          mainBarColor={"#BFF0FF"}
          setIsUndoPress={setIsUndoPress}
          // isUndoPress={isUndoPress}
          // progressBarColor={"#ebd226"}
          // mainBarColor={"#efe9bd"}
        />

        {/* <View style={[styles.bottomContainer, 
          { zIndex: swipeButtonZIndex },
          // { zIndex: 2 },
          ]}>
          <SwipeButton swiperRef={swiperRef} swipeDir={swipeDir}/>
        </View> */}

        { isCardListLoaded 
          ? ( 
            typeof cardList === "string" 
            ? (
              <View style={[styles.mainContainer, { alignItems: "center" }]}>
                <MessageContainer>{cardList}</MessageContainer>
              </View>
            ) : (
              <View style= {styles.swipeAndButtonContainer}>
                <View style={[styles.swipeContainer, { zIndex: swipeButtonZIndex===2 ? 0 : 2 }]}>
                  <Swiper
                    ref={swiperRef}
                    cards={cardList}
                    extraData={cardList}
                    cardIndex={0} // 0 si premier elem tt le temps
                    keyExtractor={(item)=>item.id}
                    renderCard={(currentCard) => (
                      <Card
                        key = {currentCard.id}
                        cardValue={currentCard}
                        currentTheme={theme[currentCard.idTheme]}
                        setSwipeButtonZIndex={setSwipeButtonZIndex}
                        swipeCardHeigth={swipeCardHeigth}
                        // isCardDetailVisible={bool}
                        // setIsDetailVisible={setIsDetailVisible}
                      />
                    )}
                    stackSize={2} // Nombre de cartes supperpopsées visibles
                    stackScale={10} // largeur des cartes en dessous (0 => même taille que la 1ere ; 10 => de plus en plus petit en dessous)
                    stackSeparation={-5} // éloignement des cartes les unes en dessous
                    // onSwiped={onSwiped}
                    onSwipedRight={(index) => onSwiped(index, "like")}
                    onSwipedLeft={(index) => onSwiped(index, "dislike")}
                    onSwipedTop={(index) => onSwiped(index, "superlike")}
                    onSwipedBottom={(index) => onSwiped(index, "dontKnow")}
                    // infinite // repars sur les premières cartes quand c'est fini => à changer
                    // onSwipedAll={() => {}}  // function à appeler quand toutes les cartes ont été swipées
                    onSwiping={onSwiping}
                    onSwipedAll={() => onSwipedAll()}
                    // dragStart={setSwipeButtonZIndex.bind(this, 0)}
                    dragEnd={()=>{
                      // setSwipeButtonZIndex(2);
                      setSwipeDir(null);
                    }}
                    backgroundColor={"transparent"}
                    animateCardOpacity // crée le changement d'opacité de la carte quand on swipe
                    animateOverlayLabelsOpacity // opacité sur le "nope", "yes"

                    // fonctionne vraimment ?
                    // overlayOpacityRange={[0, 0.25, 0.5, 1]} // adjust overlay opacity range
                    // overlayOpacityVerticalRange={[0, 0.25, 0.5, 1]} // adjust overlay vertical position range


                    // overlayOpacityVerticalThreshold={}   //todo: existe aussi pour horizontal
                    overlayLabels={{
                      left: {
                        // top et bottom si necessaire
                        title: "J'AIME PAS",
                        style: {
                          label: {
                            backgroundColor: "white",
                            color: Colors.dislike,
                            fontSize: 24,
                            borderColor: Colors.dislike,
                            borderWidth: 2,
                          },
                          wrapper: {
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            marginTop: "7%",
                            marginLeft: "-6%",
                          },
                        },
                      },
                      right: {
                        // top et bottom si necessaire
                        title: "J'AIME",
                        style: {
                          label: {
                            backgroundColor: "white",
                            color: Colors.like,
                            fontSize: 24,
                            borderColor: Colors.like,
                            borderWidth: 2,
                          },
                          wrapper: {
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            marginTop: "7%",
                            marginLeft: "6%",
                          },
                        },
                      },
                      top: {
                        // top et bottom si necessaire
                        title: "J'ADORE !",
                        style: {
                          label: {
                            backgroundColor: "white",
                            color: Colors.superLike,
                            fontSize: 24,
                            borderColor: Colors.superLike,
                            borderWidth: 2,
                          },
                          wrapper: {
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "-20%",
                          },
                        },
                      },
                      bottom: {
                        title: "NEUTRE",
                        // title: "INDECIS.E",
                        style: {
                          label: {
                            backgroundColor: "white",
                            color: Colors.dontKnow,
                            fontSize: 24,
                            borderColor: Colors.dontKnow,
                            borderWidth: 2,
                          },
                          wrapper: {
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: "10%",
                          },
                        },
                      },
                    }}
                  />
                </View>

                <View style={[styles.bottomContainer, 
                  { zIndex: swipeButtonZIndex },
                  // { zIndex: 2 },
                  ]}>
                  <SwipeButton swiperRef={swiperRef} swipeDir={swipeDir}/>
                </View>
              </View>
            )
            

          ) : (
            <ActivityComponent/>
            // <View style={styles.loadingContainer}>
            //   <ActivityIndicator size="large" color={Colors.orange500} />
            // </View>
          )
        }
      </View>
    );
  
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    flexDirection: "column",
    // justifyContent: "space-evenly"
  },
  swipeAndButtonContainer: {
    justifyContent: "space-evenly",
    flex: 1,
    // borderWidth: 1,
// 
  },
  swipeContainer: {
    height: swipeCardHeigth,
    // marginTop: "8%",
    // borderWidth: 1,
  },
  bottomContainer: {
    // bottom: "6%",
    // position: "absolute",
    // alignSelf: "center",
    // borderWidth: 1,
    height: "10%",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
  },
  arroundButton: {
    backgroundColor: Colors.white,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
