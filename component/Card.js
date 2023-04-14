import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import CardDetail from "./CardDetail";
import { useSelector } from "react-redux";

import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";

export default function Card({ cardValue, currentTheme }) {
  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);

  function handleCardDetail() {
    setIsCardDetailVisible((bool) => !bool);
  }

  // ------------------ si couleur clair en backGround -----------------
  // const allLightColor = {theme1: "#c9ebf5", theme2: "#cdf1d7", theme3: "#eeb6b5", theme4: null, theme5: "#efeab2", theme6: null};

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme?.color,
          height: isCardDetailVisible ? "73%" : "59%",
          marginTop: isCardDetailVisible ? "-44%" : "-17%",
          borderColor: currentTheme?.color,
        },
      ]}
    >
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: currentTheme?.color }]}>
          {currentTheme?.titre}
        </Text>
      </View>

      <View style={[styles.cardTextContainer]}>
        <Text
          style={[styles.cardText, { fontSize: isCardDetailVisible ? 20 : 24 }]}
        >
          {cardValue.titre}
        </Text>

        {isCardDetailVisible ? (
          <CardDetail currentTheme={currentTheme} idCard={cardValue.id} />
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
  },
});
