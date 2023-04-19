// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
// import * as Keychain from "react-native-keychain";           // marche pas sur expo
// "email": "omer972@hotmail.fr",
// "password": "orientis"
export const mainUrl = "https://app.hopteo.fr/api/v0";
const route = mainUrl + "/user";

export async function getAuthData() {
  let authData = await SecureStore.getItemAsync("authData");
  authData = JSON.parse(authData);
  return authData;
}

export async function tryAuth(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(route + "/tryAuth", requestOptions);
    console.log("[TRY_AUTH]", response.status);
    const data = await response.json();
    if (response.status === 200) {
      console.log("[TRY_AUTH]", data);
      return { ...data, success: true };
    } else {
      console.log("[TRY_AUTH FAILED]", data);
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return {
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

export async function splashRequest() {
  const authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    const response = await fetch(route + "/splashRequest", requestOptions);
    console.log("[SPLASH_REQUEST]", response.status);
    const data = await response.json();
    if (response.status === 200) {
      console.log("[SPLASH_REQUEST]", data);
      return data;
    } else {
      console.log("[SPLASH_REQUEST FAILED]", data);
      return { error: "l'initialisation a echoué" };
    }
  } catch (error) {
    console.error(error);
    return {
      error:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

export async function refreshAuth(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + refreshToken,
    },
  };

  try {
    const response = await fetch(route + "/refreshToken", requestOptions);
    console.log("[REFRESH_AUTH]", response.status);
    const data = await response.json();
    console.log("[REFRESH_AUTH]", data);
    if (response.status === 200) {
      return { ...data, success: true };
    } else {
      console.log("[REFRESH_AUTH FAILED]", data);
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
export async function login(userId, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      password: password,
    }),
  };

  try {
    const response = await fetch(route + "/login", requestOptions);
    console.log("[login]", response.status);
    const data = await response.json();
    console.log("[login]", data);
    return data;
  } catch (error) {
    console.error(error);
    return {
      error:
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
    console.log("[signup]", response.status);
    const data = await response.json();
    console.log("[signup]", data);
    return data;
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
    console.log("[STORE_USER_SETTING]", response.status);
    const data = await response.json();
    console.log("[STORE_USER_SETTING]", data);
    if (response.status === 200) {
      // la double négation "!!" est équivalente à la fonction "boolean()"
      return true;
    } else {
      console.error("[STORE_USER_SETTING]", data.error);
      return false;
    }
  } catch (error) {
    console.error("[STORE_USER_SETTING]", error);
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
