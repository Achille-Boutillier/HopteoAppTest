
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Button, Alert, } from "react-native";
import { useState, useEffect, useLayoutEffect, createRef,  } from "react";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";
import SmileyDontKnow from "../assets/icons/swipeIcons/smileyDontKnow.svg";
import SmileyDontKnowUncolored from "../assets/icons/swipeIcons/smileyDontKnowUncolored.svg";
import Like from "../assets/icons/swipeIcons/like.svg";
import Dislike from "../assets/icons/swipeIcons/dislike.svg";
import Heart from "../assets/icons/swipeIcons/heart.svg";


function SingleSwipeButton({currentSwipeButton, swiperRef, swipeDir, children}){
  const [direction, setDirection] = useState(()=>{});
  // console.log(currentSwipeButton);
  useEffect(()=> {
    switch(currentSwipeButton) {
      case "dislike" :
        setDirection("swipeLeft");
        break;
      case "dontKnow" : 
        setDirection("swipeBottom");
        break;
      case "like" : 
        setDirection("swipeRight");
        break;
      case "superLike" : 
        setDirection("swipeTop");
        break;
    } 
  }, [currentSwipeButton])


  // useEffect(()=> {
  //   console.log("[fonction direction]", direction);
  // }, [direction])


  return (
    <View style={[styles.arroundButton, {backgroundColor: swipeDir===currentSwipeButton ? Colors[currentSwipeButton] : Colors.white} ]} >
      <TouchableOpacity
        onPress={() => {swiperRef.current[direction]()}}
        style={{height: 55, width: 55, justifyContent: "center", alignItems: "center",}}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}




export default function SwipeButton({swiperRef, swipeDir}) {


  return (
    <View style={styles.mainContainer}>

      <SingleSwipeButton currentSwipeButton="dislike" swiperRef={swiperRef} swipeDir={swipeDir}>
        <Dislike width={35} height={35} fill={(swipeDir==="dislike") ? Colors.white : Colors.dislike} />
      </SingleSwipeButton>

      <SingleSwipeButton currentSwipeButton="dontKnow" swiperRef={swiperRef} swipeDir={swipeDir}>
        {(swipeDir==="dontKnow") 
          ? <SmileyDontKnowUncolored width={35} height={35} fill={Colors.white} stroke={Colors.white} />
          : <SmileyDontKnow width={35} height={35} />}
      </SingleSwipeButton>
      
        {/*propriété du contour : stroke={Colors.blue400} ; prop interieure : fill={...} */}

      <SingleSwipeButton currentSwipeButton="like" swiperRef={swiperRef} swipeDir={swipeDir}>
        <Like width={35} height={35} fill={(swipeDir==="like") ? Colors.white : Colors.like} />
      </SingleSwipeButton>

      <SingleSwipeButton currentSwipeButton="superLike" swiperRef={swiperRef} swipeDir={swipeDir}>
        <Heart width={35} height={35} fill={(swipeDir==="superLike") ? Colors.white : Colors.superLike} />
      </SingleSwipeButton>
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
