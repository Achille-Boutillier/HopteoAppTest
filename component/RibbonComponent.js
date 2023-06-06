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

      case undefined || null :
        setBannerColor(null);
        setRibbonIcon(null);
        break;
      default : 
        setBannerColor(null);
        setRibbonIcon(
            <View style={[styles.rankContainer, {borderRadius: circleSize, width: circleSize, height: circleSize, }]}>
              <Text style={[{color: Colors.white, fontWeight: "700", marginTop: -2,}, {fontSize: fontSize}]}>
                {rank}
              </Text>
            </View>
        )
        break;
    }

    
  }, [rank])

  return (
    <View style={[styles.mainContainer, {width: iconSize, height: iconSize}]}>
      {ribbonIcon}
    </View>

    );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center", 
    justifyContent:"center", 
    // borderWidth: 1
  },
  rankContainer: {
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  
});
