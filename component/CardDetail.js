import { View, StyleSheet, Image, Text, ActivityIndicator, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constant/Colors";

const screenHeigth = Dimensions.get('window').height;


export default function CardDetail({ cardDetail }) {
  const [isDetailLoaded, setIsDetailLoaded] = useState(false);
  const [heigth, setHeigth] = useState("60%");
  useEffect(() => {
    if (cardDetail) {
      setHeigth(cardDetail.length> 200 ? "75%" : "60%") ;
      setIsDetailLoaded(true)
    }
  }, [cardDetail])

  return (
    <View style={[styles.mainContainer, 
    {height:heigth }
      // {maxHeight: coef*screenHeigth,}
    ]} >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Explications :</Text>
      </View>

      <View style={styles.infoTextContainer}>
        {isDetailLoaded ? (
          <Text style={styles.infoText} adjustsFontSizeToFit={true} numberOfLines={12}>{cardDetail}</Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.smoothBlack} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 0,
    // alignItems: "center",
    marginHorizontal: "5%",
    marginTop: "5%",
    borderRadius: 10,
    // maxHeight: 0.4*screenHeigth,
    // flex: 1,
    // padding: 2,
    // borderTopLeftRadius: 10,
    paddingTop: "3%",
    backgroundColor: Colors.white,
    paddingHorizontal: "4%",
    // alignSelf: "flex-end",
    // height: "100%",
    // width: "100%",
  },

  titleContainer: {
    // width: "100%",
    height: 25,
    alignItems: "center",
    // borderWidth: 1,
    // justifyContent: "center",
    // paddingLeft: 10,
  },

  titleText: {
    textAlign: "left",
    fontWeight: "500",
    fontSize: 14,
  },

  infoTextContainer: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // fontSize: 16,
  },

  infoText: {
    // borderWidth: 1,
    // height: "100%",
    // width: "100%",
    textAlign: "left",
    // alignSelf: "flex-start",
    fontSize: 16,
    // marginHorizontal: 10,
  },
});
