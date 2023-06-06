// import { useState } from "react";
import {View, Text, StyleSheet} from "react-native";

export default function NotCoveredField({}) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}> Cette option n'est pas encore disponible. </Text>
      <Text style={styles.text}> L'équipe Hopteo met tout en oeuvre pour couvrir de nouvelles filières et de nouveaux domaines. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // height: 250,
    width: "85%",
    flex: 1,
  },
  
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 50,
  }
});
