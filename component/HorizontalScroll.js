import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
// import { useEffect, useState } from "react";

import { Colors } from "../constant/Colors";

// const width = Dimensions.get("window").width;

export default function HorizontalScroll({ children, scrollViewSize }) {
  // const scrollViewSize = { width: percentWidth * width, height: height };
  // console.log(scrollViewSize);
  return (
    <View style={[scrollViewSize, styles.mainContainer]}>
      <ScrollView
        // onScroll={({ nativeEvent }) => onScrollParcours(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled // scroll de page en page au lieu de continuellement
        horizontal
        style={scrollViewSize}
        // indicatorStyle={{backgroundColor: Colors.orange100, }}   //marche pas
        // scrollIndicatorInsets={{tintColor: Colors.orange100}}     // marche pas

      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    // borderWidth: 1,
    // paddingHorizontal:8
  },
});
