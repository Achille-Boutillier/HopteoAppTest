import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import CardDetail from "./CardDetail";
import { getDetails } from "../BackEnd/controllers/cards";

import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";

export default function Card({ cardValue, currentTheme, setSwipeButtonZIndex, swipeCardHeigth }) {
  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);
  const [cardDetail, setCardDetail] = useState(null);

  function handleCardDetail() {
    if (cardDetail==="Erreur de chargement") {
      setCardDetail(null);
    }
    setIsCardDetailVisible((bool) => !bool);
  }

  async function getCardDetail() {
    const data = await getDetails(cardValue.id);
    if (typeof data?.detail === "string") {
      setCardDetail(data.detail);
    } else {
      setCardDetail("Erreur de chargement")
    }
  }


  useEffect(()=> {
    console.log("----------------- changement de taille ------------")
    if (isCardDetailVisible) {
      setSwipeButtonZIndex(isCardDetailVisible ? 0 : 2);
    if (!cardDetail) {
      getCardDetail();
    }
    }
    
  }, [isCardDetailVisible])

  // ------------------ si couleur clair en backGround -----------------
  // const allLightColor = {theme1: "#c9ebf5", theme2: "#cdf1d7", theme3: "#eeb6b5", theme4: null, theme5: "#efeab2", theme6: null};

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme?.color,
          height: isCardDetailVisible ? "80%" : swipeCardHeigth,
          marginTop: isCardDetailVisible ? "-44%" : "-19%",
          width: isCardDetailVisible ? "110%" : "95%",
          // borderColor: currentTheme?.color,
        },
      ]}
    >
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: currentTheme?.color }] }  >
          {currentTheme?.titre}
        </Text>
      </View>

      <View style={[styles.cardTextContainer]}>
        <Text
          style={[styles.cardText, { fontSize: isCardDetailVisible ? 20 : 24 }]}
          numberOfLines={isCardDetailVisible ? 3 : 5}
          adjustsFontSizeToFit={isCardDetailVisible ? true : false}
        >
          {cardValue.titre}
        </Text>
        {isCardDetailVisible ? <CardDetail cardDetail={cardDetail} /> : null}
      </View>

      <View style={styles.infoButtonContainer}>
        <View style={styles.infoButton}>
          <PrimaryButton
            onPress={handleCardDetail}
            // name= {isCardDetailVisible ? "chevron-down" : "chevron-up" }
            name={isCardDetailVisible ? "remove-circle-outline" : "add-circle-outline"}
            size={36}
            color={Colors.orange500}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
    // elevation: 10,
    // borderWidth: 0.8,
    // borderWidth: 3,
    // borderBottomWidth: 5,
  },
  themeContainer: {
    width: "60%",
    // height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.white,
    position: "absolute",
    top: "5%",
    paddingVertical: 5,
  },
  themeText: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },

  cardTextContainer: {
    height: "73%",
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 10,
    // borderRadius: 24,
    // borderWidth: 1,
  },

  cardText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12,
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
    marginTop: 3,
    // borderWidth: 1
  },
});
