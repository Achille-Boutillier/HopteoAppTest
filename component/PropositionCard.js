import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Button} from "react-native";
import Modal from "react-native-modal";


import {Colors} from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";


function PropositionCard({ cardValue}) {

  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);

  function handleCardDetail() {
    setIsCardDetailVisible( (bool) => !bool)
  };

  // ------------------ à tej quand le back renverra les detailColor -----------------
  // const allLightColor = {theme1: "#c9ebf5", theme2: "#cdf1d7", theme3: "#eeb6b5", theme4: null, theme5: "#efeab2", theme6: null};
  const allDetailContainerColor = {theme1: "#6cd4f4", theme2: "#78e295", theme3: "#d53232", theme4: null, theme5: null, theme6: null};
  // "#70ddfe" ; "#7eef9d"
  // const themeLightColor = allLightColor[cardValue.idTheme]
  const detailContainerColor = allDetailContainerColor[cardValue.idTheme]
  //-------------------------------------------------------------------------------------------
  const themeColor = cardValue.themeColor
  // console.log(themeColor);
  

  const propositionDetail = (
    <View style={[styles.infoContainer, {backgroundColor: detailContainerColor}]}>
      <Text style={{ textAlign: "left", alignSelf: "flex-start", fontWeight: "500" }}>Explications :</Text>
      <Text style={{ textAlign: "left", alignSelf: "flex-start" }}>{cardValue.detail}</Text>
    </View>
  );

  return (
    <View style={[styles.card, { 
      backgroundColor: themeColor, height: isCardDetailVisible? "73%" : "59%", marginTop: isCardDetailVisible? "-44%" : "-17%", borderColor: themeColor 
    }]} >
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: themeColor }]}>
          {cardValue.themeTitre}
        </Text>
      </View>

      <View style={[styles.cardTextContainer]}>
        <Text style={[styles.propositionText, {fontSize: isCardDetailVisible ? 20 : 24,}]}>{cardValue.titre}</Text>
        {isCardDetailVisible ? propositionDetail : null}

      </View>

      <View style={styles.infoButtonContainer}>
        <View style={styles.infoButton}>
          <PrimaryButton
            onPress={handleCardDetail}
            // name= {isCardDetailVisible ? "chevron-down" : "chevron-up" }
            // size={40}
            name="help-outline"
            size={36}
            color={Colors.orange500}
          />
        </View>
      </View>


      {/* <Modal isVisible={isCardDetailVisible}>
        <View
          style={[
            styles.infoModalContainer,
            { backgroundColor: cardValue.themeColor },
          ]}
        >
          <View style={{ alignItems: "flex-end" }}>
            <PrimaryButton
              onPress={handleCardDetail}
              name="close-outline"
              size={38}
              color={Colors.orange500}
            />
          </View>
          <View style={styles.infoModalText}>
            <Text style={{ textAlign: "justify" }}>{cardValue.detail}</Text>
          </View>
        </View>
      </Modal> */}
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
  
  // infoModalContainer: {
  //   // height: "30%",
  //   width: "97%",
  //   padding: "3%",
  //   borderBottomLeftRadius: 40,
  //   borderBottomRightRadius: 40,
  //   borderTopLeftRadius: 3,
  //   borderTopRightRadius: 3,
  //   alignSelf: "center",
  //   marginTop: "40%",
  // },

  infoContainer: {
    alignItems: "center",
    marginHorizontal: "8%",
    marginTop: "5%",
    borderRadius: 10,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    // width: "100%"
  },

});