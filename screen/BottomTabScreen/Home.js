import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, Alert, } from "react-native";
// import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect, useLayoutEffect, createRef,  } from "react";

import Swiper from "react-native-deck-swiper";

import Card from "../../component/Card";
import PrimaryButton from "../../component/PrimaryButton";
import { Colors } from "../../constant/Colors";
import { HeaderButton } from "../../component/TopBar";
import {nextPile, unDoSwipe, swipeHandler, } from "../../BackEnd/controllers/cards";
import SmileyDontKnow from "../../assets/icons/smileyDontKnow.svg";
import SwipeLevel from "../../component/SwipeLevel";
import { alertProvider } from "../../BackEnd/errorHandler";
import MessageContainer from "../../component/MessageContainer";
import { storeNewSwipe, removeSwipe } from "../../core/reducers/swipeReducer";

const swiperRef = createRef();

function SwipeButton() {
  return (
    <View style={styles.buttonContainer}>
      <PrimaryButton
        onPress={() => swiperRef.current.swipeLeft()}
        name="close"
        size={48}
        color="red"
      />
      <TouchableOpacity
        onPress={() => swiperRef.current.swipeBottom()}
        style={{
          height: 55,
          width: 55,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SmileyDontKnow width={35} height={35} fill={Colors.orange500} />
      </TouchableOpacity>

      <PrimaryButton
        onPress={() => swiperRef.current.swipeRight()}
        name="heart"
        size={40}
        color="red"
      />
      <PrimaryButton
        onPress={() => swiperRef.current.swipeTop()}
        name="star"
        size={39}
        color={Colors.orange500}
      />
    </View>
  );
}

export default function Home({ navigation, route }) {
  const themeState = useSelector((state) => state.themeReducer.theme);
  const swipeReducer = useSelector((state) => state.swipeReducer);

  const dispatch = useDispatch();

  const [theme, setTheme] = useState();
  const [listIndex, setListIndex] = useState(); // listIndex = indice relatif à "cardList"
  const [absoluteIndex, setAbsoluteIndex] = useState(); // index total en comptant toutes les cartes

  const [isPileOver, setIsPileOver] = useState(true); // true car necessite un chargement initial

  const [isCardListLoaded, setIsCardListLoaded] = useState(false);
  const [cardList, setCardList] = useState([]);
  

  const [swipeButtonZIndex, setSwipeButtonZIndex] = useState(2);
  const [isUndoPress, setIsUndoPress] = useState(false);

  
  

  useEffect(() => {
    setTheme(themeState);
    console.log("[themeState]", themeState);
    console.log("[swipeReducer]", swipeReducer);

  }, [themeState]);

  
// ========= gestion cartes swipe ================================

  function unableCard() {
    setIsCardListLoaded(false);
  }

  async function getCards(nextIdCardList) {
    setIsPileOver(false);
    if (nextIdCardList.length===0) {
      setCardList("Tu as swipé toutes les cartes disponibles \n Nos équipes travaillent pour t'en proposer d'autres");
      setIsCardListLoaded(true);
      return
    }
    console.log("[idCardList]", nextIdCardList)
    unableCard();
    const response = await nextPile(nextIdCardList);
    console.log("Je passe dans getCards");
    console.log( "[cardsObject]" ,response);
    if (response.cardsPile) {
      setListIndex(0);
      setCardList(response.cardsPile);
      setIsCardListLoaded(true);  
    } else {
      alertProvider();
    }
  }
 
  useEffect(() => {
    if (isPileOver) {
      console.log("[swipeReducer]", swipeReducer);
      const answeredCards = Object.keys(swipeReducer.swipeTypeObj);
      const notAnsweredCards = swipeReducer.idCardsList.filter(item => !(answeredCards.includes(item)));
      const nextIdCardList = notAnsweredCards.slice(0,10);
      getCards(nextIdCardList);
    }
  }, [isPileOver]);

  // ================== fin gestion cartes swipe ==============================

  //================= gestion header buttons =======================================

  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  async function onUndoPress() {
    setIsUndoPress(true);
  }

  function displayUndoError() {
    Alert.alert(
      "Erreur...",
      "Impossible de revenir en arrière pour le moment",
      [{ text: "Ok", style: "cancel" }]
    );
  }

  async function handleUndoPress() {
    console.log("je passe dans handleUndoPress");
    if (absoluteIndex === 0) {
      Alert.alert("Impossible !", "Tu te trouves déjà sur la première carte", [
        { text: "Ok", style: "cancel" },
      ]);
    } else {
      if (listIndex === 0) {
        const undoSuccess = await unDoSwipe();
        !!undoSuccess && !undoSuccess?.error ? getCards() : displayUndoError(); // getCard() si pas d'erreur
      } else {
        const index = listIndex;
        swiperRef.current.jumpToCardIndex(listIndex - 1); // set l'index de la carte
        setListIndex((i) => i - 1);
        const undoSuccess = await unDoSwipe();
        !!undoSuccess && !undoSuccess?.error
          ? null
          : (() => {
              // si erreur :
              swiperRef.current.jumpToCardIndex(index); // set l'index de la carte
              setListIndex(index);
              displayUndoError();
            })(); // callback directement executée
      }
    }
  }

  useEffect(() => {
    if (isUndoPress) {
      handleUndoPress();
      setIsUndoPress(false);
    }
  }, [isUndoPress]);

  // Créer les boutons
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => ( <HeaderButton onSettingsPress={onSettingsPress} onUndoPress={onUndoPress} />),
    });
  }, [navigation]);

  //================== fin header button ==========================================================



  async function onSwiped(index, swipeType) {
    console.log(`swiper index : ${index}`);
    const id = cardList[index].id;         // todo: remplacer "_id" par "id"
    console.log( "[id swipe ]" ,id);
    setListIndex(index + 1);
    dispatch(storeNewSwipe({id, swipeType}))
    // todo: maj les reducers avec réponse question
    const isSuccessfull = await swipeHandler(id, swipeType);
    if (!isSuccessfull) {
      dispatch(removeSwipe(id));
      alertProvider("Le swipe n'a pas été pris en compte")
    }
  }

  // useEffect(() => {
  //   setAbsoluteIndex(listIndex + initialLength);
  // }, [listIndex, initialLength]);

  useEffect(() => {
    console.log("[swipeReducer]", swipeReducer);
    length = Object.keys(swipeReducer.swipeTypeObj).length;
    console.log("[absoluteIndex]", length);
    setAbsoluteIndex(length);
  }, [swipeReducer.swipeTypeObj]);



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
          progressBarColor={"#ebd226"}
          borderColor={null}
          mainBarColor={"#efe9bd"}
        />

        <View style={[styles.bottomContainer, { zIndex: swipeButtonZIndex }]}>
          <SwipeButton />
        </View>

        <View style={styles.cardContainer}>
          <Swiper
            ref={swiperRef}
            cards={cardList}
            extraData={cardList}
            cardIndex={0} // 0 si premier elem tt le temps
            keyExtractor={(item) => item.id}     // todo: rechanger _id par id
            renderCard={(currentCard) => (
              <Card
                cardValue={currentCard}
                currentTheme={theme[currentCard.idTheme]}
              />
            )}
            stackSize={2} // Nombre de cartes supperpopsées visibles
            stackScale={10} // largeur des cartes en dessous (0 => même taille que la 1ere ; 10 => de plus en plus petit en dessous)
            stackSeparation={-5} // éloignement des cartes les unes en dessous
            // onSwiped={onSwiped}
            onSwipedRight={(index) => onSwiped(index, "like")}
            onSwipedLeft={(index) => onSwiped(index, "dislike")}
            onSwipedTop={(index) => onSwiped(index, "superLike")}
            onSwipedBottom={(index) => onSwiped(index, "dontKnow")}
            // infinite // repars sur les premières cartes quand c'est fini => à changer
            // onSwipedAll={() => {}}  // function à appeler quand toutes les cartes ont été swipées
            onSwipedAll={() => setIsPileOver(true)}
            dragStart={setSwipeButtonZIndex.bind(this, 0)}
            dragEnd={setSwipeButtonZIndex.bind(this, 2)}
            backgroundColor={"transparent"}
            animateCardOpacity // crée le changement d'opacité de la carte quand on swipe
            animateOverlayLabelsOpacity // opacité sur le "nope", "yes"
            overlayLabels={{
              left: {
                // top et bottom si necessaire
                title: "J'AIME PAS",
                style: {
                  label: {
                    backgroundColor: "white",
                    color: "red",
                    fontSize: 24,
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
                    color: "green",
                    fontSize: 24,
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
                    color: "green",
                    fontSize: 24,
                  },
                  wrapper: {
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "-20%",
                  },
                },
              },
              bottom: {
                // top et bottom si necessaire
                title: "PAS D'AVIS",
                style: {
                  label: {
                    backgroundColor: "white",
                    color: "red",
                    fontSize: 24,
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
  },
  cardContainer: {
    height: "60%",
    marginTop: "8%",
  },
  bottomContainer: {
    bottom: "6%",
    position: "absolute",
    alignSelf: "center",
    // borderWidth: 1,
    height: "10%",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
