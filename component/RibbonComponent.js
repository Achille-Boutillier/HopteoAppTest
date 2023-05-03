import {StyleSheet, View, Text, TouchableOpacity, Dimensions,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constant/Colors";
import { useEffect, useState } from "react";

import FirstMedal from "../assets/icons/firstMedal.svg";
import SecondMedal from "../assets/icons/secondMedal.svg";
import ThirdMedal from "../assets/icons/thirdMedal.svg";


export default function RibbonComponent({rank, size=35, setBannerColor}){
  const [ribbonIcon, setRibbonIcon] = useState(null);

  useEffect(()=> {
    let color = null;
    // let RibbonIcon;
    console.log(rank);
    switch (rank) {
      case 1 :
        color=Colors.first;
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<FirstMedal width={size} height={size} fill={color} />);
        break;
      case 2 :
        color=Colors.second;
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<SecondMedal width={size} height={size} fill={color} />);
        break;
      case 3 :
        color=Colors.third
        setBannerColor ? setBannerColor(color) : null;
        setRibbonIcon(<ThirdMedal width={size} height={size} fill={color} />);
        break;
      default : 
        setRibbonIcon(
          <View style={{width: size, height: size, alignItems: "center", justifyContent:"center"}}>
            <View style={styles.rankContainer}>
              <Text style={{color: Colors.grey, fontWeight: "500", fontSize: 14, marginTop: -2,}}>
                {rank}
              </Text>
            </View>
          </View>
        )
        break;
    }

    // setRibbonIcon(<RibbonIcon width={35} height={35} fill={color} />);
    
  }, [rank])

  return ribbonIcon;
}

const styles = StyleSheet.create({
  rankContainer: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
});
