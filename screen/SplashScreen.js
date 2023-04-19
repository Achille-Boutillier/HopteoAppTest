import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {getUserSettingRequest, getUserSettingSuccess, getUserSettingFailure } from "../core/reducers/userSettingReducer";
import {getThemeRequest, getThemeSuccess, getThemeFailure,} from "../core/reducers/themeReducer";
import {initCardRequest, initCardSuccess, initCardFailure } from "../core/reducers/cardReducer";

import store from "../core";

import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)

import { Colors } from "../constant/Colors";
import {getAuthData, signup, splashRequest, refreshAuth, login, tryAuth,} from "../BackEnd/controllers/userData";

export default function SplashScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();

  async function tryLogin(authData) {
    console.log("on va passer dans login");
    const data = await login(authData?.userId, authData?.password);
    if (data.token) {
      // console.log(data);
      const newAuthData = await storeNewAuthData(authData, data);
      console.log("newAuthData", newAuthData);
      tryToken(newAuthData, false);
    } else {
      setErrorMessage("une erreur est survenue");
    }
  }

  async function storeNewAuthData(authData, newData) {
    authData.token = newData.token;
    authData.refreshToken = newData.refreshToken;
    console.log("authData maj: ", authData);
    await SecureStore.setItemAsync("authData", JSON.stringify(authData)); // ! si store echoue, pas d'erreur déclenchée --> bug sur Home
    return authData;
  }

  async function tryRefreshToken(authData) {
    console.log("refreshToken", authData.refreshToken);
    const data = await refreshAuth(authData.refreshToken);
    if (data.token) {
      const newAuthData = await storeNewAuthData(authData, data);
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
    const data = await tryAuth(authData.token);
    if (data.success) {
      if (data.userSettingStatus) {
        storeSplashData();
      } else {
        navigation.navigate("First Questions Screen");
      }
    } else {
      letTryRefresh
        ? tryRefreshToken(authData)
        : setErrorMessage("token invalide");
    }
  }

  async function storeSplashData() {
    const splashData = await splashRequest();
    if (splashData.error) {
      setErrorMessage(splashData.error);
      dispatch(getThemeFailure("splashRequest failed"));
      dispatch(getUserSettingFailure("splashRequest failed"));
      dispatch(initCardFailure("splashRequest failed"));
    } else {
      const {themeObj, filiere, secondYearFiliere, answeredCardList, idCardsList, minSwipeForRanking } = splashData
      const cursusType = "ingenieur";
      dispatch(getThemeSuccess(themeObj));
      dispatch(getUserSettingSuccess({filiere, secondYearFiliere, cursusType}));
      dispatch(initCardSuccess({answeredCardList, idCardsList, minSwipeForRanking}));
      console.log("themeObj : ", store.getState().themeReducer); // .themeReducer.theme pour avoir que l'objet
      navigation.navigate("Main Screens");
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
        SecureStore.setItemAsync("authData", JSON.stringify(signUpAnswer)) // ! si store echoue, pas d'erreur déclenchée --> bug sur Home
          .then(() => tryToken(signUpAnswer, false));
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
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
