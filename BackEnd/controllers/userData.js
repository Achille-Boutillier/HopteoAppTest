
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
// import * as Keychain from "react-native-keychain";           // marche pas sur expo
import store from "../../core";
import { getThemeSuccess, getThemeRequest, getThemeFailure } from "../../core/reducers/themeReducer";
import { getUserSettingRequest, getUserSettingSuccess, getUserSettingFailure } from "../../core/reducers/userSettingReducer";
import { splashSwipeSuccess } from "../../core/reducers/swipeReducer";



export const mainUrl = "https://app.hopteo.com/api/v0";
const route = mainUrl + "/user";

export async function getAuthData() {
  let authData = await SecureStore.getItemAsync("authData");
  authData = JSON.parse(authData);
  return authData;
}

export function getUserSettingStatus() {
  const {cursustype, filiere} = store.getState().userSettingReducer;
  return {cursustype, filiere} 
}

export async function storeNewAuthData(newAuthData) {
  await SecureStore.setItemAsync("authData", JSON.stringify(newAuthData)); // ! si store echoue, pas d'erreur déclenchée --> bug sur Home
}


export function storeSplashData(splashData, dispatch) {
  const {themeObj, 
    filiere, cursustype, secondYearFiliere, 
    answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj, answerByTheme, swipeSettings } = splashData;
  dispatch(getThemeSuccess(themeObj));
  dispatch(getUserSettingSuccess({filiere, secondYearFiliere, cursustype}));
  dispatch(splashSwipeSuccess({answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj, answerByTheme, swipeSettings}));
}


// ---------------------------------------------------------------------

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
      return {...data, success: true};
    } else {
      console.log("[TRY_AUTH FAILED]", data);
      return {success: false};
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
      success: false,
    };
  }
}


// export async function splashRequest() {
//   const authData = await getAuthData();

//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + authData.token,
//     },
//   };

//   try {
//     const response = await fetch(route + "/splashRequest", requestOptions);
//     console.log("[SPLASH_REQUEST]", response.status);
//     const data = await response.json();
//     if (response.status === 200) {
//       console.log("[SPLASH_REQUEST]", data);
//       return data;
//     } else {
//       console.log("[SPLASH_REQUEST FAILED]", data);
//       return { error: "l'initialisation a echoué" };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       error:
//         "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
//     };
//   }
// }

export async function refreshAuth(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + refreshToken,
      getSplashData: true   
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
export async function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      getSplashData: true
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(route + "/login", requestOptions);
    console.log("[login]", response.status);
    const data = await response.json();
    console.log("[login]", data);
    if (response.status===200) {
      return {...data, success: true};
    } else {
      return {...data, success: false}
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
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
      password: password
    }),
  };

  try {
    const response = await fetch(route + "/signup", requestOptions);
    console.log("[signup]", response.status);
    const data = await response.json();
    console.log("[signup]", data);
    if (response.status===201) {
      return {...data, success: true};
    } else {
      return {...data, success: false};
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// Enregistrer le type de cursus et la moyenne au bac de l'utilisateur
export async function storeUserSetting(cursustype, field, moyBac) {
  let authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      getSplashData: true,
    },
    body: JSON.stringify({
      cursusType: cursustype,
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
      return {...data, success: true};
    } else {
      console.error("[STORE_USER_SETTING]", data.error);
      return {...data, success: true};
    }
  } catch (error) {
    console.error("[STORE_USER_SETTING]", error);
    return {
      success: false,
      error: "L'enregistrement des données renseignées à échoué"
    };
  }
}

// Reset les userData de l'utilisateur

