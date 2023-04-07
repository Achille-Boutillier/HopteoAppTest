// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
// import * as Keychain from "react-native-keychain";           // marche pas sur expo
// "email": "omer972@hotmail.fr",
// "password": "orientis"
export const mainUrl = "https://app.hopteo.fr/api";
const route = mainUrl + "/user";

export async function getAuthData() {
  let authData = await SecureStore.getItemAsync("authData");
  authData = JSON.parse(authData);
  return authData;
}

export async function splashRequest(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(route + "/splashRequest", requestOptions);
    console.log("[splashRequest]", response.status);
    if (response.status === 200) {
      const data = await response.json();
      return { ...data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
      success: false,
    };
  }
}

export async function refreshAuth(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer" + refreshToken,
    },
  };

  try {
    const response = await fetch(route + "/refreshToken", requestOptions);
    console.log("[refreshAuth]", response.status);
    if (response.status === 200) {
      const data = await response.json();
      console.log("[refreshAuth]", data);
      return { ...data, success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return {
      error:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// se connecter à son compte
export async function login(email, password) {
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
    console.log("[login]", data);
    // AsyncStorage.setItem("authData", JSON.stringify(data));
    if (data?.token) {
      // await Keychain.setGenericPassword(data.userId, data.token);
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
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
export async function signup() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(route + "/signup", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log("[signup]", data);
    if (response.status === 200) {
      await SecureStore.setItemAsync("authData", JSON.stringify(data));
      return { token: data.token };
    } else {
      return { message: "Une erreur est survenue" };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// Enregistrer le type de cursus et la moyenne au bac de l'utilisateur
export async function storeUserSetting(cursusType, field, moyBac) {
  let authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
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
  let authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
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
