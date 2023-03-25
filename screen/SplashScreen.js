import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { Colors } from "../constant/Colors";
import { checkUserToken } from "../BackEnd/controllers/userData";
import { useEffect, useState } from "react";

export default function SplashScreen({ navigation }) {
  async function goToScreen() {
    const isUserToken = await checkUserToken();
    if (isUserToken) {
      navigation.navigate("Main Screens");
    } else {
      navigation.navigate("Login Screen");
    }
  }

  useEffect(() => {
    goToScreen();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* <ActivityIndicator size="large" color={Colors.orange500} /> */}
      <Image
        source={require("../assets/images/splashHopteo.png")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
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
