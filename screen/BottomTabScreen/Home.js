import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
// import Modal from "react-native-modal";

import { useState, useEffect, useLayoutEffect, createRef } from "react";

import Swiper from "react-native-deck-swiper";

import PropositionCard from "../../component/PropositionCard";
import PrimaryButton from "../../component/PrimaryButton";
import { Colors } from "../../constant/Colors";
import { HeaderButton } from "../../component/TopBar";
import {
  getProposition,
  unDoSwipe,
  swipeHandler,
} from "../../BackEnd/controllers/cards";
import SmileyDontKnow from "../../assets/icons/smileyDontKnow.svg";
import SwipeLevel from "../../component/SwipeLevel";
import { alertProvider } from "../../BackEnd/errorHandler";
import MessageContainer from "../../component/MessageContainer";

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
  const [listIndex, setListIndex] = useState(); // listIndex = indice relatif à la liste "proposition"
  const [initialLength, setInitialLength] = useState(); // initialLength + index = total number of proposition answered
  const [absoluteIndex, setAbsoluteIndex] = useState(); // index total en comptant toutes les propositions
  const [minSwipeForRanking, setMinSwipeForRanking] = useState();

  const [isPropositionLoaded, setIsPropositionLoaded] = useState(false);
  const [proposition, setProposition] = useState([]);
  const [isSwipeButtonActivated, setIsSwipeButtonActivated] = useState(true);
  const [swipeButtonValue, setSwipeButtonValue] = useState(null);

  const [swipeButtonZIndex, setSwipeButtonZIndex] = useState(2);
  const [isUndoPress, setIsUndoPress] = useState(false);

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  function onManageSwipeButtonPressed() {
    setIsSwipeButtonActivated((value) => !value);
  }

  useEffect(() => {
    if (isSwipeButtonActivated) {
      setSwipeButtonValue(<SwipeButton />);
    } else {
      setSwipeButtonValue(null);
    }
  }, [isSwipeButtonActivated]);

  function unableCard() {
    setIsPropositionLoaded(false);
  }

  async function getCards() {
    unableCard();
    const propositionObject = await getProposition();
    console.log("Je passe dans getCards");
    console.log(propositionObject);
    if (propositionObject?.propositionPile) {
      setListIndex(0);
      setInitialLength(propositionObject.propSwipedLength);
      setMinSwipeForRanking(propositionObject.minSwipeForRanking);
      setProposition(propositionObject.propositionPile);
      setIsPropositionLoaded(true);
      // if (isPropositionLoaded) {
      //   swiperRef.current.jumpToCardIndex(0);   // reset l'index de la carte
      // }
    } else if (propositionObject?.message) {
      // console.log("message", "haha" instanceof String);
      setProposition(propositionObject.message);
      setIsPropositionLoaded(true);
    } else {
      alertProvider(loginScreenNavigation, getCards);
    }
  }

  useEffect(() => {
    // ? Comment connaitre le previous screen ? réponse GPT, marche pas :
    // ?  les élements de .routes ne changent pas d'ordre en fonction d'où l'on vient
    // ? .history ne possède que "Home" à chaque fois
    // const navState = navigation.getState();            //* Get the current navigation state
    // const prevScreenIndex = navState.index - 1;        //* Get the index of the previous route/screen
    // const prevScreenName = navState?.routes[prevScreenIndex]?.name;    //* Get the name of the previous screen using the route object
    // ou tester avec navState.history ?

    const unsubscribe = navigation.addListener("focus", () => {
      getCards();
    });
    return unsubscribe;
  }, [navigation]);

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
    const listTest = {};

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
      headerRight: () => (
        <HeaderButton
          onSettingsPress={onSettingsPress}
          onUndoPress={onUndoPress}
          onManageSwipeButtonPressed={onManageSwipeButtonPressed}
        />
      ),
    });
  }, [navigation]);

  //=======================================================================================

  async function onSwiped(index, routeEnd) {
    console.log(`swiper index : ${index}`);
    const id = proposition[index].id;
    console.log(id);
    setListIndex(index + 1);
    const response = await swipeHandler(id, routeEnd);
    console.log(response);
  }

  useEffect(() => {
    setAbsoluteIndex(listIndex + initialLength);
  }, [listIndex, initialLength]);

  useEffect(() => {
    console.log(`AbsoluteIndex : ${absoluteIndex}`);
    // console.log(absoluteIndex);
  }, [absoluteIndex]);

  // async function handleSwipe() {

  //   const propId = proposition[listIndex-1].id;
  //   console.log(propId);

  //   const isSwipeHandled = await swipeHandler(propId, routeEnd);
  //   console.log(isSwipeHandled);
  //   console.log(listIndex);

  // }

  // useEffect(() => {
  //   if (listIndex>0) {
  //     handleSwipe();
  //   }
  // }, [listIndex])

  // ---------- méthodes relatives au swipe ----------------------

  // () => swiperRef.current.jumpToCardIndex(newIndex);
  // () => swiperRef.current.swipeBack();

  //------------------------------------------

  if (isPropositionLoaded && proposition instanceof Array) {
    return (
      <View style={styles.mainContainer}>
        <SwipeLevel
          absoluteIndex={absoluteIndex}
          minSwipeForRanking={minSwipeForRanking} // 'pas' des levels
          progressBarColor={"#ebd226"}
          borderColor={null}
          mainBarColor={"#efe9bd"}
        />

        <View style={[styles.bottomContainer, { zIndex: swipeButtonZIndex }]}>
          {swipeButtonValue}
        </View>

        <View style={styles.cardContainer}>
          <Swiper
            ref={swiperRef}
            cards={proposition}
            extraData={proposition}
            cardIndex={0} // 0 si premier elem tt le temps
            keyExtractor={(item) => item.id}
            renderCard={(currentCard) => (
              <PropositionCard cardValue={currentCard} />
            )}
            stackSize={2} // Nombre de cartes supperpopsées visibles
            stackScale={10} // largeur des cartes en dessous (0 => même taille que la 1ere ; 10 => de plus en plus petit en dessous)
            stackSeparation={-5} // éloignement des cartes les unes en dessous
            // onSwiped={onSwiped}
            onSwipedRight={(index) => onSwiped(index, "/onLike")}
            onSwipedLeft={(index) => onSwiped(index, "/onDislike")}
            onSwipedTop={(index) => onSwiped(index, "/onSuperLike")}
            onSwipedBottom={(index) => onSwiped(index, "/onDontKnow")}
            // infinite // repars sur les premières cartes quand c'est fini => à changer
            // onSwipedAll={() => {}}  // function à appeler quand toutes les cartes ont été swipées
            onSwipedAll={() => getCards()}
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
  } else if (isPropositionLoaded && typeof proposition === "string") {
    return (
      <View style={[styles.mainContainer, { alignItems: "center" }]}>
        <MessageContainer>{proposition}</MessageContainer>
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
