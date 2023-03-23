import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";

function SecondaryHeader({children}) {
  return (
    <View style={styles.mainStyle} >
      <Text style={styles.TextStyle} >{children} </Text>
    </View>
  );
}

export default SecondaryHeader;

const styles = StyleSheet.create({
  mainStyle: {
    marginLeft: "6%",
    marginTop: 15,
    marginBottom: 10,
  },
  TextStyle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.grey,
  },
});