import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";

import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";
import { getDetails } from "../BackEnd/controllers/cards";

function PropositionCard({ cardValue, theme }) {
  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);
  const [propositionDetail, setPropositionDetail] = useState(
    <ActivityIndicator size={"large"} color={Colors.smoothBlack} />
  );
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);

  function handleCardDetail() {
    setIsCardDetailVisible((bool) => !bool);
  }

  // ------------------ à tej quand le back renverra les detailColor -----------------
  // const allLightColor = {theme1: "#c9ebf5", theme2: "#cdf1d7", theme3: "#eeb6b5", theme4: null, theme5: "#efeab2", theme6: null};
  const allDetailContainerColor = {
    theme1: "#6cd4f4",
    theme2: "#78e295",
    theme3: "#d53232",
    theme4: null,
    theme5: null,
    theme6: null,
  };
  // "#70ddfe" ; "#7eef9d"
  // const themeLightColor = allLightColor[cardValue.idTheme]
  const detailContainerColor = allDetailContainerColor[cardValue.idTheme];
  //-------------------------------------------------------------------------------------------
  const themeColor = theme[cardValue.idTheme];
  // const themeColor = cardValue.themeColor;
  // console.log(themeColor);

  async function getCardDetail() {
    console.log("cardvalue -->", cardValue);
    const detail = await getDetails(cardValue.id);
    console.log(detail);
    setPropositionDetail(
      <Text style={styles.infoText} adjustsFontSizeToFit={true}>
        {detail}
      </Text>
    );
    setIsDetailLoaded(true);
  }

  useEffect(() => {
    console.log("typeof", typeof propositionDetail);
    if (isCardDetailVisible && !isDetailLoaded) {
      getCardDetail();
    }
    console.log("theme", theme);
  }, [isCardDetailVisible]);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColor,
          height: isCardDetailVisible ? "73%" : "59%",
          marginTop: isCardDetailVisible ? "-44%" : "-17%",
          borderColor: themeColor,
        },
      ]}
    >
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: themeColor }]}>
          {cardValue.themeTitre}
        </Text>
      </View>

      <View style={[styles.cardTextContainer]}>
        <Text
          style={[
            styles.propositionText,
            { fontSize: isCardDetailVisible ? 20 : 24 },
          ]}
        >
          {cardValue.titre}
        </Text>

        {isCardDetailVisible ? (
          <View
            style={[
              styles.infoContainer,
              { backgroundColor: detailContainerColor },
            ]}
          >
            <Text style={styles.infoTextTitle}>Explications :</Text>
            {propositionDetail}
          </View>
        ) : null}
      </View>

      <View style={styles.infoButtonContainer}>
        <View style={styles.infoButton}>
          <PrimaryButton
            onPress={handleCardDetail}
            // name= {isCardDetailVisible ? "chevron-down" : "chevron-up" }
            name={isCardDetailVisible ? "chevron-down" : "help-outline"}
            size={36}
            color={Colors.orange500}
          />
        </View>
      </View>
    </View>
  );
}

export default PropositionCard;

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
    width: "95%",
    // elevation: 10,
    // borderWidth: 0.8,
    // borderWidth: 3,
    // borderBottomWidth: 5,
  },
  themeContainer: {
    width: "60%",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.white,
    position: "absolute",
    top: "7%",
  },
  themeText: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },

  cardTextContainer: {
    height: "60%",
    width: "90%",
    justifyContent: "center",
    // borderRadius: 24,
    // borderWidth: 1,
  },

  propositionText: {
    textAlign: "center",
    fontWeight: "400",
  },

  infoTextTitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    fontWeight: "500",
    marginTop: 5,
    marginHorizontal: 10,
  },

  infoText: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },

  infoContainer: {
    alignItems: "center",
    marginHorizontal: "5%",
    marginTop: "5%",
    borderRadius: 10,
    // paddingVertical: "2%",
    // paddingHorizontal: "4%",
    height: "70%",
    // width: "100%"
  },

  infoButtonContainer: {
    position: "absolute",
    bottom: -200,
    backgroundColor: Colors.white,
    borderRadius: 250,
    width: 250,
    height: 250,
    // borderWidth: 1,
    // paddingTop: 2,
  },
  infoButton: {
    alignSelf: "center",
  },
});
