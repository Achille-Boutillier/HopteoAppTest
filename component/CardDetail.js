import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetails } from "../BackEnd/controllers/cards";
import { Colors } from "../constant/Colors";

export default function CardDetail({ currentTheme, idCard }) {
  const dispatch = useDispatch();

  const [cardDetail, setCardDetail] = useState();
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);

  // todo : enregistrer le détail dans le store des cartes
  async function getCardDetail() {
    // console.log("cardvalue -->", cardValue);
    const data = await getDetails(idCard);
    console.log("detail :", data.detail);
    const detail =
      typeof data?.detail === "string"
        ? data.detail
        : "Un beug empêche l'obtention du détail";

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
