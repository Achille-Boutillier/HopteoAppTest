
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, Alert, } from "react-native";
import { useState, useEffect, useLayoutEffect, createRef,  } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";
import SmileyDontKnow from "../assets/icons/smileyDontKnow.svg";
import SmileyDontKnowUncolored from "../assets/icons/smileyDontKnowUncolored.svg";
import Like from "../assets/icons/like.svg";
import Dislike from "../assets/icons/dislike.svg";


export default function SwipeButton({swiperRef, swipeDir}) {

  useEffect(()=> {
    console.log("[swipeDir]", swipeDir)
  },[swipeDir])

  return (
    <View style={styles.mainContainer}>

      <View style={[styles.arroundButton, {backgroundColor: swipeDir==="dislike" ? Colors.dislike : Colors.white} ]} >
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeLeft()}
          style={{height: 55, width: 55, justifyContent: "center", alignItems: "center",}}
        >
          <Dislike width={35} height={35} fill={swipeDir==="dislike" ? Colors.white : Colors.dislike}  />
          {/*propriété du contour : stroke={Colors.blue400} ; prop interieure : fill={...} */}
        </TouchableOpacity>
      </View>

      <View style={[styles.arroundButton, {backgroundColor: swipeDir==="dontKnow" ? Colors.dontKnow : Colors.white} ]} >
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeBottom()}
          style={{height: 55, width: 55, justifyContent: "center", alignItems: "center",}}
        >
          {swipeDir==="dontKnow" 
            ? <SmileyDontKnowUncolored width={35} height={35} fill={Colors.white} stroke={Colors.white} />
            : <SmileyDontKnow width={35} height={35} />
          }
          {/*propriété du contour : stroke={Colors.blue400} ; prop interieure : fill={...} */}
        </TouchableOpacity>
      </View>

      <View style={[styles.arroundButton, {backgroundColor: swipeDir==="like" ? Colors.like : Colors.white} ]} >
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          style={{height: 55, width: 55, justifyContent: "center", alignItems: "center",}}
        >
          <Like width={35} height={35} fill={swipeDir==="like" ? Colors.white : Colors.like}  />
          {/*propriété du contour : stroke={Colors.blue400} ; prop interieure : fill={...} */}
        </TouchableOpacity>
      </View>

      {/* <View style={[styles.arroundButton, {backgroundColor: swipeDir==="like" ? Colors.like : Colors.white} ]} >
        <PrimaryButton
          onPress={() => swiperRef.current.swipeRight()}
          // name="heart"
          name="thumbs-up"
          size={40}
          color={swipeDir==="like" ? Colors.white : Colors.like}
        />
      </View> */}

      <View style={[styles.arroundButton, {backgroundColor: swipeDir==="superLike" ? Colors.superLike : Colors.white} ]} >
        <PrimaryButton
          onPress={() => swiperRef.current.swipeTop()}
          // name="star"
          name="heart"
          size={40}
          color={swipeDir==="superLike" ? Colors.white : Colors.superLike}
        />
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 1,
    // backgroundColor: Colors.backgroundColor+"99",
    // opacity: 0.5,  // affecte les enfants...
  },
  arroundButton: {
    // backgroundColor: Colors.white,
    borderRadius: 50,
  },
});
