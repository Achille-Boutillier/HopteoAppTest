// import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";

function MessageContainer({children}) {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.textStyle}>{children}</Text>
      </View>
    );
}

export default MessageContainer;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue400,
    width: "70%",
    height: "20%",
    borderRadius: 10,
    marginTop: "30%",
    paddingHorizontal: "10%",
  },
  textStyle : { 
    fontWeight: "600", 
    fontSize: 16, 
    color: Colors.grey,
    textAlign: 'center',
}
});