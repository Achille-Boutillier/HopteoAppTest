import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constant/Colors";

export default function OneNumber({number, numberName, width}) {
    return (
      <View style={[styles.mainContainer, {width: width}]} >
        <Text style={styles.numberStyle}>{number}</Text>
        <Text style={styles.numberNameStyle}>{numberName}</Text>
      </View>

    );
}

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    
  },
  numberStyle: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.smoothBlack,
    textAlign: "center",
  },
  numberNameStyle: {
    fontSize: 8,
    textAlign: "center",
    verticalAlign: "middle",
    color: Colors.grey,
    fontWeight: "600",
  },
});