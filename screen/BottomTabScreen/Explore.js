import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";

import { Colors } from "../../constant/Colors";
import SearchBar from "../../component/SearchBar";
import HorizontalScroll from "../../component/HorizontalScroll";

const width = Dimensions.get("window").width;
// const scrollViewSize = { width: 0.3 * width, height: 150 };

export default function Explore({ navigation, route }) {
  const data = [
    {
      title: "1-jndljnljvnjlljgnljvg",
      description: "1-jhbchksbckhrhkcbrhcb",
    },
    { title: "2-kifjshncjkfcnf", description: "2-skjncjkfncc" },
    { title: "3-kifjshncjkfcnf", description: "3-skjncjkfncc" },
  ];

  const percentWidth = 0.9;
  const height = 150,
    scrollViewSize = { width: percentWidth * width, height: height };

  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <HorizontalScroll percentWidth={percentWidth} height={height}>
        {data.map(
          (item, index) => (
            <View
              key={index}
              style={[styles.innerScrollViewContainer, scrollViewSize]}
            >
              <Text style={styles.subTitle}>{item.title}</Text>
            </View>
          )
          // <Text  style={{width: 50, height: 50, borderWidth: 1}}>{item}</Text>
        )}
      </HorizontalScroll>

      {/* <View style={[scrollViewSize, { alignSelf: "center" }]}>
        <ScrollView
          // onScroll={({ nativeEvent }) => onScrollParcours(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled // scroll de page en page au lieu de continuellement
          horizontal
          style={scrollViewSize}
        >
          {data.map(
            (item, index) => (
              <View key={index} style={styles.innerScrollViewContainer}>
                <Text style={styles.subTitle}>{item.title}</Text>
              </View>
            )
            // <Text  style={{width: 50, height: 50, borderWidth: 1}}>{item}</Text>
          )}
        </ScrollView>
      </View> */}
    </View>
  );
  // <View style={styles.podiumContainer}></View>; // contener bleu à rajouter avant flatList
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
