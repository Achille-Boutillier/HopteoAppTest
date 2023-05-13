import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constant/Colors";
import { useEffect } from "react";
import { useState } from "react";

export default function TerciaryButton({title, onPress, color, isFullColor, fontSize=18}) {
  const [backgroundColor, setBackgroundColor] = useState();
  const [titleColor, setTitleColor] = useState();

  useEffect(()=> {
    setBackgroundColor(isFullColor ? color : Colors.white) ;
    setTitleColor(isFullColor ? Colors.white : color) ;
  }, [isFullColor])

  return (
    <TouchableOpacity 
    style={[styles.mainContainer, {backgroundColor: backgroundColor}, isFullColor ? null : {borderWidth: 1.5, borderColor: titleColor}]} 
    onPress={onPress}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={[styles.textStyle, {color: titleColor, fontSize: fontSize}]}>{title}</Text>
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
    fontWeight: "600",
  },
});
