import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Colors } from "../constant/Colors";

export default function ChargingScreen() {
  
  return (
    <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color={Colors.orange500}/>
    </View>
   );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
});
