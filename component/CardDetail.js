import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetails } from "../BackEnd/controllers/cards";
import { Colors } from "../constant/Colors";
import {
  getCardRequest,
  getCardFailure,
  getCardSuccess,
} from "../core/reducers/swipeReducer";
import { useSelector } from "react-redux";
import store from "../core";

export default function CardDetail({ currentTheme, idCard }) {
  const dispatch = useDispatch();

  const [cardDetail, setCardDetail] = useState(); // ! temporaire le temps que CardValue soit relié a reduce dans Home (obtention de detail par cardValue.detail )
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);

  const currentCardState = useSelector(
    (state) => state.cardReducer.allCard[idCard]
  ); // ! temporaire le temps que CardValue soit relié a reduce dans Home

  async function getCardDetail() {
    console.log("cardState", currentCardState);

    let detail; // ! inutile quand cardReducer relié à Home
    if (currentCardState?.detail) {
      detail = currentCardState.detail;
    } else {
      dispatch(getCardRequest());
      const data = await getDetails(idCard);
      // console.log("detail :", typeof data?.detail === "string");
      if (typeof data?.detail === "string") {
        detail = data.detail;
        dispatch(
          getCardSuccess({
            id: idCard,
            card: { ...currentCardState, ...data },
          })
        );
        console.log("[cardReducecr state : ]", store.getState().cardReducer);
      } else {
        detail = "Un beug empêche l'obtention du détail";
        dispatch(getCardFailure());
      }
      detail =
        typeof data?.detail === "string"
          ? data.detail
          : "Un beug empêche l'obtention du détail";
    }
    // console.log("cardvalue -->", cardValue);

    setCardDetail(detail);
    setIsDetailLoaded(true);
  }

  useEffect(() => {
    getCardDetail();
  }, []);

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: currentTheme?.detailColor },
      ]}
    >
      <View style={styles.infoTitleContainer}>
        <Text style={styles.infoTitleText}>Explications :</Text>
      </View>

      <View style={styles.infoTextContainer}>
        {isDetailLoaded ? (
          <Text
            style={styles.infoText}
            adjustsFontSizeToFit={true}
            numberOfLines={18}
          >
            {cardDetail}
          </Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.smoothBlack} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: "center",
    marginHorizontal: "5%",
    marginTop: "5%",
    borderRadius: 10,
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    height: "70%",
    // width: "100%",
  },

  infoTitleContainer: {
    // width: "100%",
    height: 25,
    // borderWidth: 1,
    // justifyContent: "center",
    // paddingLeft: 10,
  },

  infoTitleText: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: 14,
  },

  infoTextContainer: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    // borderWidth: 1,
    // height: "100%",
    // width: "100%",
    textAlign: "left",
    // alignSelf: "flex-start",
    fontSize: 14,
    // marginHorizontal: 10,
  },
});
