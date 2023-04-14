import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getThemeRequest,
  getThemeSuccess,
  getThemeFailure,
} from "../core/reducers/themeReducer";
import store from "../core";

import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)

import { Colors } from "../constant/Colors";
import {
  getAuthData,
  signup,
  splashRequest,
  refreshAuth,
  login,
} from "../BackEnd/controllers/userData";

export default function SplashScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

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

  // todo: implementer le stop des boucles infinies

  function navigateToScreen(userSettingStatus) {
    if (userSettingStatus) {
      navigation.navigate("Main Screens");
    } else {
      navigation.navigate("First Questions Screen");
    }
  }

  async function tryLogin(authData) {
    console.log("on va passer dans login");
    const data = await login(authData?.userId, authData?.password);
    if (data.token) {
      // console.log(data);
      const newAuthData = storeNewAuthData(authData, data);
      console.log("newAuthData", newAuthData);
      tryToken(newAuthData);
    } else {
      setErrorMessage("une erreur est survenue");
    }
  }

  function storeNewAuthData(authData, newData) {
    authData.token = newData.token;
    authData.refreshToken = newData.refreshToken;
    console.log("authData maj: ", authData);
    SecureStore.setItemAsync("authData", JSON.stringify(authData));
    return authData;
  }

  async function tryRefreshToken(authData) {
    console.log("refreshToken", authData.refreshToken);
    const data = await refreshAuth(authData.refreshToken);
    if (data.token) {
      const newAuthData = storeNewAuthData(authData, data);
      tryToken(newAuthData, false);
    } else {
      if (data?.error) {
        setErrorMessage(data.error);
      } else {
        tryLogin(authData);
      }
    }
  }

  async function tryToken(authData, letTryRefresh = true) {
    const data = await splashRequest(authData.token);
    if (data.success) {
      console.log("[splashRequest]", data);
      dispatch(getThemeSuccess(data.themeObj));
      console.log("themeObj : ", store.getState().themeReducer); // .themeReducer.theme pour avoir que l'objet

      navigateToScreen(data?.userSettingStatus);
    } else {
      dispatch(getThemeFailure());
      letTryRefresh
        ? tryRefreshToken(authData)
        : setErrorMessage("token invalide");
    }
  }

  async function splashHandler() {
    const authData = await getAuthData();
    console.log("authData", authData);
    if (authData?.token) {
      tryToken(authData);
    } else {
      const signUpAnswer = await signup();
      if (signUpAnswer.token) {
        setErrorMessage(); // éviter d'avoir un msg d'erreur si on revient sur la page de connexion plus tard
        // delete signUpAnswer.message  // ! considéré inutile
        SecureStore.setItemAsync("authData", JSON.stringify(signUpAnswer));
        tryToken(signUpAnswer, false);
      } else {
        const message = signUpAnswer?.message
          ? signUpAnswer.message
          : "L'initialisation utilisateur a échoué";
        setErrorMessage(message);
      }
    }
  }

  // tester les différents cas :
  async function tester() {
    // SecureStore.deleteItemAsync("authData");
    const authData = await getAuthData();
    authData.token = "a";
    // authData.refreshToken = "b";
    await SecureStore.setItemAsync("authData", JSON.stringify(authData));
  }

  useEffect(() => {
    dispatch(getThemeRequest());
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
