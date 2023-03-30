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

  return (
    <View style={[scrollViewSize, styles.mainContainer]}>
      <ScrollView
        // onScroll={({ nativeEvent }) => onScrollParcours(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled // scroll de page en page au lieu de continuellement
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
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
