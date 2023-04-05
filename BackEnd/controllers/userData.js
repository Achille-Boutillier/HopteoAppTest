// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
// import * as Keychain from "react-native-keychain";           // marche pas sur expo
// "email": "omer972@hotmail.fr",
// "password": "orientis"
export const mainUrl = "https://app.hopteo.com/apilorient";
const route = mainUrl + "/user";

export async function getUserToken() {
  // let userToken = await AsyncStorage.getItem("userToken");
  // let userToken = await Keychain.getGenericPassword();
  let loginData = await SecureStore.getItemAsync("loginData");
  // let userToken = {"a" : "a"}
  loginData = JSON.parse(loginData);
  // console.log(loginData);
  return loginData;
}

export async function checkUserToken() {
  let loginData = await SecureStore.getItemAsync("loginData");
  if (loginData) {
    return true;
  } else {
    return false;
  }
}

// se connecter à son compte
export async function login(email, password) {
  // todo : remettre en place quand serveur ok
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(route + "/login", requestOptions);
    const data = await response.json();
    console.log(data);
    // AsyncStorage.setItem("userToken", JSON.stringify(data));
    if (data?.token) {
      // await Keychain.setGenericPassword(data.userId, data.token);
      await SecureStore.setItemAsync("loginData", JSON.stringify(data));
      return { success: true, userSettingStatus: data.userSettingStatus };
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// Se créer un compte hopteo
export async function signup(email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(route + "/signup", requestOptions);
    // console.log(response);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (data?.token) {
      // await Keychain.setGenericPassword(data.userId, data.token);
      await SecureStore.setItemAsync("loginData", JSON.stringify(data));
      return { success: true };
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
    console.log("eroooooooor");
    return {
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// Enregistrer le type de cursus et la moyenne au bac de l'utilisateur
export async function storeUserSetting(cursusType, field, moyBac) {
  let userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    body: JSON.stringify({
      cursusType: cursusType,
      filiere: field,
      moyBac: moyBac,
    }),
  };

  try {
    let response = await fetch(route + "/storeSetting", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (!!data.error) {
      // la double négation "!!" est équivalente à la fonction "boolean()"
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

// Reset les userData de l'utilisateur
export async function reset(password) {
  let userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    // body: JSON.stringify({
    //     password: password
    // })
  };

  try {
    let response = await fetch(route + "/reset", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}
