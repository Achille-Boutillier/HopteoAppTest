import { View, StyleSheet, Text, Button, TextInput, ScrollView, Dimensions } from "react-native";
// import { useState, useEffect } from "react";

import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";
import { BrandComponent } from "./TopBar";
import ScrollableChipingLine from "./ScrollableChipingLine";

const width = Dimensions.get('window').width;
const scrollableLineWidth = width*0.9 -40 -30;

export default function RankingHeaderComponent({ onPressCapture, isScreenshotMode}) {

  const filterList = ["concours", "type de formation", "ville", "jndljvnfv"];

  return (
    <View style={{}}>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          {isScreenshotMode 
            ? <BrandComponent/>
            // : <ScrollableChipingLine titleList={filterList}/>
            : <Text style={styles.titleText}>Ton classement</Text>
          }
        </View>
        <View style={styles.rigthContainer}>
          <View style={styles.screenshotButtonBackground}>
            <PrimaryButton onPress={onPressCapture} name="share-social" size={20} color={Colors.orange500}/>
          </View>
        </View>
      </View>
      {/* <ScrollableChipingLine titleList={filterList}/> */}
      
    </View>
  );
}


const styles = StyleSheet.create({
  
  mainContainer: {
    // marginHorizontal: "5%",
    // marginBottom: "10%",
    marginTop: "4%",
    flexDirection: "row",
    marginBottom: "4%",
    justifyContent: "space-between",
  }, 
  titleText: {
    fontWeight: "500",
    fontSize: 18,
    color: Colors.grey,
    verticalAlign: "middle",
    // borderWidth: 1
  },
  leftContainer: {
    width: scrollableLineWidth,  
    // borderWidth: 1
  },
  rigthContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    // borderWidth: 1

  },
  screenshotButtonBackground: {
    width: 30,
    height: 30,
    borderRadius: 30,
    // paddingLeft: -5,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    marginBottom: "1%", 
  }
});