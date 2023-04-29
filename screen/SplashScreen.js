import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import {getUserSettingRequest, getUserSettingSuccess, getUserSettingFailure } from "../core/reducers/userSettingReducer";
// import {getThemeRequest, getThemeSuccess, getThemeFailure,} from "../core/reducers/themeReducer";
// import {splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure } from "../core/reducers/swipeReducer";

// import store from "../core";
// import store from "../core";

import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)

import { Colors } from "../constant/Colors";
import {getAuthData, refreshAuth, tryAuth, storeNewAuthData, storeSplashData} from "../BackEnd/controllers/userData";

export default function SplashScreen({ navigation }) {
  // const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  
  //todo: mettre les fonctions de store dans le frontEnd

  async function tryRefreshToken(authData) {
    // console.log("refreshToken", authData.refreshToken);
    const data = await refreshAuth(authData.refreshToken, true);
    if (data.authData) {
      await storeNewAuthData(data.authData);
      if (data.userSettingStatus) {
        storeSplashData(data.splashData, dispatch);
        navigation.navigate("Main Screens");

      } else {
      navigation.navigate("First Questions Screen");
      }
    } else {
      navigation.navigate("Login Screen");
    }
  }

  async function tryToken(authData, letTryRefresh = true) {
    const data = await tryAuth(authData.token);
    if (data.success) {
      if (data.userSettingStatus) {
        storeSplashData(data.splashData, dispatch);
        navigation.navigate("Main Screens");
      } else {
        navigation.navigate("First Questions Screen");
      }
    } else {
      tryRefreshToken(authData)
    }
  }


  async function splashHandler() {
    const authData = await getAuthData();
    console.log("authData", authData);
    if (authData?.token) {
      tryToken(authData);
    } else {
      navigation.navigate("Signup Screen");
    }
  }

  // tester les différents cas :
  async function tester() {
    SecureStore.deleteItemAsync("authData");
    // const authData = await getAuthData();
    // authData.token = "a";
    // authData.refreshToken = "b";
    // await SecureStore.setItemAsync("authData", JSON.stringify(authData));
  }

  useEffect(() => {
    // dispatch(getThemeRequest());

    splashHandler();
    // tester();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* <ActivityIndicator size="large" color={Colors.orange500} /> */}
      <Image
        source={require("../assets/images/splashHopteo.png")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
      {/* <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View> */}
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
  errorContainer: {
    alignSelf: "center",
    width: "80%",
    position: "absolute",
    top: 150,
  },
  errorText: {
    textAlign: "center",
    color: Colors.orange500,
    fontWeight: "600",
  },
});
