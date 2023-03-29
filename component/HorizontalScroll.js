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

const width = Dimensions.get("window").width;
// const scrollViewSize = { width: 0.3 * width, height: 150 };

export default function HorizontalScroll({ percentWidth, height, children }) {
  const scrollViewSize = { width: percentWidth * width, height: height };

  return (
    <View
      style={[
        scrollViewSize,
        { alignSelf: "center", borderRadius: 10, overflow: "hidden" },
      ]}
    >
      <ScrollView
        // onScroll={({ nativeEvent }) => onScrollParcours(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled // scroll de page en page au lieu de continuellement
        horizontal
        style={scrollViewSize}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
    // justifyContent: "center",
    // height: "20%",
    // width: "80%",
    // borderWidth: 1,
    // alignSelf: "center",
  },

  innerScrollViewContainer: {
    backgroundColor: Colors.white,
    // paddingHorizontal: 20,
    // paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
  },

  rowItem: {
    width: "50%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
