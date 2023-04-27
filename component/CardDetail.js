import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constant/Colors";

export default function CardDetail({ currentTheme, cardDetail }) {
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  useEffect(() => {
    if (cardDetail) {
      setIsDetailLoaded(true)
    }
  }, [cardDetail])

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
          <Text style={styles.infoText} adjustsFontSizeToFit={true} numberOfLines={18}> {cardDetail} </Text>
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
