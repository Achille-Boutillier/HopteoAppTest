import { FlatList, StyleSheet, View, ActivityIndicator, Text} from "react-native";
import { useEffect, useState} from "react";

import {Colors} from "../../constant/Colors";
import SearchBar from "../../component/SearchBar";




export default function Explore({navigation, route}) {
  
  

  return (
    <View style={styles.mainContainer}>
      <SearchBar></SearchBar>
    </View>
  );
  // <View style={styles.podiumContainer}></View>; // contener bleu à rajouter avant flatList
}



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
  },

  
});