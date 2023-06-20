import { StyleSheet, View, Text, ScrollView} from "react-native";
import React, { useEffect, useState, cloneElement } from "react";
import DotComponent from "./DotComponent";
import { Colors } from "../../../constant/Colors";



export default function SwipeableBanner({ bannerSize, onScroll, scrollList, currentNumber, children  }) {
  
  return (
    <View style={styles.swipeableContainer}>
      <View style={[bannerSize, {zIndex: 1}]}>
        <ScrollView
          onScroll={({ nativeEvent }) => onScroll(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled // scroll de page en page au lieu de continuellement
          horizontal
          style={bannerSize}
        >
         {children}
        </ScrollView>
      </View>

      <DotComponent list={scrollList} currentNumber={currentNumber} />
    </View>
  );

  
}


const styles = StyleSheet.create({
  swipeableContainer: {
    // alignItems: "center",
    // borderWidth: 1,
    // height: 56,
    // padding: 1,
  },
});
