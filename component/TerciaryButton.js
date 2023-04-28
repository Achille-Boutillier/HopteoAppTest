import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../constant/Colors";
import { useEffect } from "react";
import { useState } from "react";

export default function TerciaryButton({title, onPress, color, isFullColor}) {
  const [backgroundColor, setBackgroundColor] = useState();
  const [titleColor, setTitleColor] = useState();

  useEffect(()=> {
    setBackgroundColor(isFullColor ? color : Colors.white) ;
    setTitleColor(isFullColor ? Colors.white : color) ;
  }, [])

  return (
    <TouchableOpacity 
    style={[styles.mainContainer, {backgroundColor: backgroundColor}, isFullColor ? null : {borderWidth: 1.5, borderColor: titleColor}]} 
    onPress={onPress}
    >
      <Text style={[styles.textStyle, {color: titleColor}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,

  },
  textStyle: {
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 18,
    fontWeight: "600",
  },
});
