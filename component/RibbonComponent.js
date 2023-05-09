import {StyleSheet, View, Text, TouchableOpacity, Dimensions,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constant/Colors";
import { useEffect, useState } from "react";

import FirstMedal from "../assets/icons/firstMedal.svg";
import SecondMedal from "../assets/icons/secondMedal.svg";
import ThirdMedal from "../assets/icons/thirdMedal.svg";


export default function RibbonComponent({rank, circleSize=22, fontSize=14, iconSize=35 ,setBannerColor}){
  const [ribbonIcon, setRibbonIcon] = useState(null);

  useEffect(()=> {
    let color = null;
    // let RibbonIcon;
    // console.log(rank);
    switch (rank) {
      case null || undefined :
        setRibbonIcon(null);
        break;
      case 1 :
        color=Colors.first;
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<FirstMedal width={iconSize} height={iconSize} fill={color} />);
        break;
      case 2 :
        color=Colors.second;
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<SecondMedal width={iconSize} height={iconSize} fill={color} />);
        break;
      case 3 :
        color=Colors.third
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<ThirdMedal width={iconSize} height={iconSize} fill={color} />);
        break;
      default : 
        setBannerColor(null);
        setRibbonIcon(
          <View style={{ alignItems: "center", justifyContent:"center"}}>
            <View style={[styles.rankContainer, {borderRadius: circleSize, width: circleSize, height: circleSize, }]}>
              <Text style={[{color: Colors.white, fontWeight: "700", marginTop: -2,}, {fontSize: fontSize}]}>
                {rank}
              </Text>
            </View>
          </View>
        )
        break;
    }

    
  }, [rank])

  return ribbonIcon;
}

const styles = StyleSheet.create({
  rankContainer: {
    // borderWidth: 1,
    // borderColor: Colors.grey,
    backgroundColor: Colors.grey,
    // borderRadius: 22,
    // width: 22,
    // height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  
});
