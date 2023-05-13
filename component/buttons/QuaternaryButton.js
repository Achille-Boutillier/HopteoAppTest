import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constant/Colors";
import { useEffect } from "react";
import { useState } from "react";

export default function QuaternaryButton({title, onPress, textColor, fontSize=14}) {


  return (
    <TouchableOpacity 
    style={styles.mainContainer} 
    onPress={onPress}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={[styles.textStyle, {color: textColor, fontSize: fontSize}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // height: 30,
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: "5%",
    // borderRadius: 10,
    // paddingHorizontal: 5,
    // paddingVertical: 5,

  },
  textStyle: {
    // textAlign: "center",
    // verticalAlign: "middle",
    fontWeight: "600",
  },
});
