import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { Colors } from "../constant/Colors";
import {
  getAuthData,
  signup,
  splashRequest,
  refreshAuth,
} from "../BackEnd/controllers/userData";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)

export default function SplashScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState();

  // async function goToScreen() {
  //   const isUserToken = await checkUserToken();
  //   if (isUserToken) {
  //     navigation.navigate("Main Screens");
  //   } else {
  //     navigation.navigate("Login Screen");
  //   }
  // }

  // useEffect(() => {
  //   goToScreen();
  // }, []);

  // todo: implementer stop des boucles infinies

  function navigateToScreen(userSettingStatus) {
    if (userSettingStatus) {
      navigation.navigate("Main Screens");
    } else {
      navigation.navigate("First Questions Screen");
    }
  }

  async function tryRefreshToken(authData) {
    const data = await refreshAuth(authData.refreshToken);
    if (data.success) {
      authData.token = data.token;
      authData.refreshToken = data.refreshToken;
      await SecureStore.setItemAsync("authData", JSON.stringify(authData));
      //todo: splashRequest(data.Token);
      console.log(data);
    } else {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        //todo:  tryLogin();
        console.log("on va passer dans login");
      }
    }
  }

  async function tryToken(authData) {
    const data = await splashRequest(authData.token);
    if (data.success) {
      console.log("[splashRequest]", data);
      //todo:  store themeObj (reducer)
      navigateToScreen(data?.userSettingStatus);
    } else {
      tryRefreshToken(authData);
    }
  }

  async function splashHandler() {
    const authData = await getAuthData();
    if (authData?.token) {
      tryToken(authData);
    } else {
      const signUpAnswer = await signup();
      if (signUpAnswer.token) {
        setErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
        tryToken(signUpAnswer.token);
      } else {
        setErrorMessage(signUpAnswer.message);
      }
    }
  }

  useEffect(() => {
    splashHandler();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* <ActivityIndicator size="large" color={Colors.orange500} /> */}
      <Image
        source={require("../assets/images/splashHopteo.png")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
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
  errorText: {
    position: "absolute",
    top: 150,
  },
});
