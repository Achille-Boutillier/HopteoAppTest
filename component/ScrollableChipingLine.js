import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors } from "../constant/Colors";
import SingleChip from "./SingleChip";


export default function ScrollableChipingLine({titleList }) {
 

  return (
    
    <ScrollView contentContainerStyle={styles.mainContainer} horizontal showsHorizontalScrollIndicator={false}>
      {titleList.map((item, index)=>
        <SingleChip key={index}>{item}</SingleChip>
      )}
    </ScrollView>

  );
};

const styles = StyleSheet.create({

  mainContainer:{
    flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
    overflow: "hidden",
  },

});
