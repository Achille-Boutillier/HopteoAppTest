import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";
// import EStyleSheet from "react-native-extended-stylesheet";

function BlueContainer({name, text }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={name} size={20} color={Colors.grey} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text} adjustsFontSizeToFit={true}>
          {text}
        </Text>
      </View>
    </View>
  );
}

export default BlueContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blue400,
    width: "42%",
    height: "100%",
    borderRadius: 10,
    paddingHorizontal: 6,
    // paddingHorizontal: "2.5%",
    paddingVertical: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
    // flex: 1,
    // width: "14%",
    marginRight: 3,
    // borderWidth:1,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.grey,
    textAlign: "center",
    // borderWidth: 1,
  },
});
