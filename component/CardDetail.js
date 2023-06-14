import { View, StyleSheet, Image, Text, ActivityIndicator, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constant/Colors";
import ActivityComponent from "./ActivityComponent";

// const screenHeigth = Dimensions.get('window').height;


export default function CardDetail({ cardDetail }) {

  const [fontSize, setFontSize] = useState(16);
  // const [isDetailLoaded, setIsDetailLoaded] = useState(false);

  // const [heigth, setHeigth] = useState("60%");

  // useEffect(() => {
  //   if (cardDetail) {
  //     setHeigth(cardDetail.length> 200 ? "75%" : "60%") ;
  //     setIsDetailLoaded(true)
  //   }
  // }, [cardDetail])


  useEffect(() => {
    if (cardDetail) {
      cardDetail.length>300 ? setFontSize(14) : null;
      cardDetail.length>390 ? setFontSize(12) : null;
      cardDetail.length<150 ? setFontSize(18) : null;
      console.log(cardDetail.length);
    }
  }, [cardDetail])

  return (
    <View style={[styles.mainContainer, 
    // {height:heigth }
      // {maxHeight: coef*screenHeigth,}
    ]} >

      <View style={styles.infoTextContainer}>
        {cardDetail ? (
          <Text style={[styles.infoText, {fontSize: fontSize}]}
          //  adjustsFontSizeToFit={true} 
          //  numberOfLines={12}
          >
            {cardDetail}
          </Text>
        ) : (
          // <ActivityComponent/>
          <ActivityIndicator size="small" color={Colors.smoothBlack} />
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: "5%",
    // marginTop: "5%",
    borderRadius: 10,
    paddingVertical: "3%",
    backgroundColor: Colors.white,
    paddingHorizontal: "4%",
  },

  infoTextContainer: {
    // flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding
  },

  infoText: {
    // textAlign: "justify",
    textAlign: "center",
    // textAlign: "left",
  },
});
