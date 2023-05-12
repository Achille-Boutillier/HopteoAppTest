import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, Alert, Dimensions, AppState } from "react-native";
// import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect, useLayoutEffect, createRef, useRef  } from "react";

import Swiper from "react-native-deck-swiper";

import Card from "../../component/Card";
// import PrimaryButton from "../../component/PrimaryButton";
import { Colors } from "../../constant/Colors";
import { HeaderButton } from "../../component/TopBar";
import {nextPile, undoSwipe, swipeHandler, updateSwipe} from "../../BackEnd/controllers/cards";
import SwipeLevel from "../../component/SwipeLevel";
import { alertProvider } from "../../BackEnd/errorHandler";
import MessageContainer from "../../component/MessageContainer";
import { storeNewSwipe, removeSwipe, handleAllSwipeSent } from "../../core/reducers/swipeReducer";
import SwipeButton from "../../component/SwipeButton";
import store from "../../core";
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
  
  // const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [swipeButtonZIndex, setSwipeButtonZIndex] = useState(2);
  const [swipeDir, setSwipeDir] = useState(null);
  const [isUndoPress, setIsUndoPress] = useState(false);

  

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


  
  async function upgradeBackData() {
    const {notSentToBackAnswers, sentToBackAnswers, swipeTypeObj, removedIdStillInBackEnd} = latestSwipeReducer;
    // console.log("[removedIdStillInBackEnd]", removedIdStillInBackEnd);
    if (notSentToBackAnswers.length>0 || removedIdStillInBackEnd.length>0) {   //todo: revoir la logique
      console.log("it needs to be upgraded ===================");
      console.log("[removedIdStillInBackEnd]", removedIdStillInBackEnd);
      const filteredSwipeTypeObj = notSentToBackAnswers.reduce((obj, key) => {
        if (key in swipeTypeObj) {
          obj[key] = swipeTypeObj[key];
        }
        return obj;
      }, {});

      const success = await updateSwipe(notSentToBackAnswers, filteredSwipeTypeObj, removedIdStillInBackEnd);
      //todo : handle les removedIdStillInBackEnd

      if (success) {
        dispatch(handleAllSwipeSent());
      } else {
        console.log("couldn't update backEnd swipe answers");
      }
      
    } else {
      console.log("backEnd swipe answers update is not needed")
    }
  }
 
 
   useEffect(()=> {
     if (appState!=="active") {
       upgradeBackData(); 
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
      setCardList("Tu as swipé toutes les cartes disponibles. \n Nos équipes travaillent pour t'en proposer d'autres");
      setIsCardListLoaded(true);
      return
    }
    console.log("[idCardList]", nextIdCardList)
    unableCard();
    const data = await nextPile(nextIdCardList);
    console.log("Je passe dans getCards");
    console.log( "[cardsObject]" ,data);
    if (data.cardsPile) {
      setListIndex(0);
      console.log("[cardList]", data.cardsPile);
      setCardList(data.cardsPile);
      setIsCardListLoaded(true);  
    } else {
      alertProvider(data.error);
    } 
  }


  function calculNextCardsToAsk() {
    const answeredCards = Object.keys(swipeReducer.swipeTypeObj);
    const notAnsweredCards = swipeReducer.idCardsList.filter(item => !(answeredCards.includes(item)));
    return notAnsweredCards.slice(0,12);
  }
 
  useEffect(() => {
    if (isPileOver) {
      const nextIdCardList = calculNextCardsToAsk();
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
    const {notSentToBackAnswers, sentToBackAnswers} = swipeReducer;
    console.log("[notSentToBackAnswers]", notSentToBackAnswers);
    console.log("[sentToBackAnswers]", sentToBackAnswers);
    let previousCardId;
    if (notSentToBackAnswers.length===0){
      previousCardId = sentToBackAnswers[sentToBackAnswers.length-1];
    } else {
      previousCardId = notSentToBackAnswers[notSentToBackAnswers.length-1];
    }

    const {cardsPile, error} = await nextPile([previousCardId]);
    if (cardsPile) {
      const {id, idTheme} = cardsPile[0];
      // const newCardList = cardList;
      // newCardList.unshift(cardsPile[0]);      // add an element to the biginning of newCardList (return length de la nouvelle liste)
      const undoSuccess = await undoSwipe(id, idTheme, dispatch);
      (undoSuccess)
        ? setCardList((previousList) => [cardsPile[0], ...previousList]) 
        : alertProvider("Impossible de revenir en arrière pour le moment");
        
    } else {
      alertProvider(error);
    }
  }

  async function gotToPreviousCard() {
    const index = listIndex;
    const {id, idTheme} = cardList[index-1];
    swiperRef.current.jumpToCardIndex(index - 1); 
    setListIndex(index - 1);
    const undoSuccess = await undoSwipe(id, idTheme, dispatch);
    if (!undoSuccess) {
      swiperRef.current.jumpToCardIndex(index), 
      setListIndex(index),
      alertProvider("Impossible de revenir en arrière pour le moment")
    }
      
  }


  async function onPressUndo() {
    setIsUndoPress(true);
  }


  async function handleUndoPress() {
    console.log("je passe dans handleUndoPress");
    if (absoluteIndex === 0) {
      Alert.alert("Impossible !", "Tu te trouves déjà sur la première carte", [
        { text: "Ok", style: "cancel" },
      ]);
    } else {

      if (listIndex === 0) {
        getPreviousCard();
      } else {
        gotToPreviousCard();
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
    dispatch(storeNewSwipe({id, swipeType, idTheme}))
    // const isSuccessfull = await swipeHandler(id, swipeType);
    // if (!isSuccessfull) {
    //   dispatch(removeSwipe({id, idTheme}));
    //   alertProvider("Le swipe n'a pas été pris en compte")
    // }
  }


  useEffect(() => {
    // console.log("[swipeReducer]", swipeReducer);
    length = Object.keys(swipeReducer.swipeTypeObj).length;
    console.log("[absoluteIndex]", length);
    setAbsoluteIndex(length);
  }, [swipeReducer.swipeTypeObj]);

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

  // ---------- méthodes relatives au swipe ----------------------

  // () => swiperRef.current.jumpToCardIndex(newIndex);
  // () => swiperRef.current.swipeBack();

  //------------------------------------------

  if (isCardListLoaded && cardList instanceof Array) {
    return (
      <View style={styles.mainContainer}>
        <SwipeLevel
          absoluteIndex={absoluteIndex}
          minSwipeForRanking={swipeReducer.minSwipeForRanking} // 'pas' des levels
          progressBarColor={"#70DDFF"}
          // borderColor={null}
          mainBarColor={"#BFF0FF"}
          onPressUndo={onPressUndo}
          // progressBarColor={"#ebd226"}
          // mainBarColor={"#efe9bd"}
        />

        {/* <View style={[styles.bottomContainer, 
          { zIndex: swipeButtonZIndex },
          // { zIndex: 2 },
          ]}>
          <SwipeButton swiperRef={swiperRef} swipeDir={swipeDir}/>
        </View> */}

        <View style={[styles.swipeContainer, { zIndex: swipeButtonZIndex===2 ? 0 : 2 }]}>
          <Swiper
            ref={swiperRef}
            cards={cardList}
            extraData={cardList}
            cardIndex={0} // 0 si premier elem tt le temps
            keyExtractor={(item)=>item.id}
            // keyExtractor2={(item)=> `${item}-2`}
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
            onSwipedAll={() => setIsPileOver(true)}
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
                title: "INDECIS",
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
    );
  } else if (isCardListLoaded && typeof cardList === "string") {
    return (
      <View style={[styles.mainContainer, { alignItems: "center" }]}>
        <MessageContainer>{cardList}</MessageContainer>
      </View>
    );
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.orange500} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    flexDirection: "column",
    justifyContent: "space-evenly"
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
