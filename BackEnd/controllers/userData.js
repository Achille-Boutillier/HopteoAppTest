
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
// import * as Keychain from "react-native-keychain";           // marche pas sur expo
import store from "../../core";
import { getThemeSuccess} from "../../core/reducers/themeReducer";
import { getUserSettingSuccess } from "../../core/reducers/userSettingReducer";
import { splashSwipeSuccess } from "../../core/reducers/swipeReducer";



export const mainUrl = "https://app.hopteo.com/api/v0";
const route = mainUrl + "/user";

export async function getAuthData() {
  let authData = await SecureStore.getItemAsync("authData");
  authData = JSON.parse(authData);
  return authData;
}

export function getUserSettingStatus() {
  const {cursustype, userFiliere} = store.getState().userSettingReducer;
  return {cursustype, userFiliere} 
}

export async function storeNewAuthData(newAuthData) {
  await SecureStore.setItemAsync("authData", JSON.stringify(newAuthData)); // ! si store echoue, pas d'erreur déclenchée --> bug sur Home
}


export function storeSplashData(splashData, dispatch) {
  const {themeObj, 
    filiere, cursustype, secondYearFiliere, 
    answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj, answerByTheme, swipeSettings,
    lastAppVersion } = splashData;
  dispatch(getThemeSuccess(themeObj));
  dispatch(getUserSettingSuccess({userFiliere: filiere, secondYearFiliere, cursustype, lastAppVersion}));
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
      // getSplashData: false
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

      let errorMessage;
      if (typeof data?.error === "string") {
        errorMessage=data.error;
      } else if (typeof data?.message === "string") {
        errorMessage=data.message;
      } else {
        errorMessage="Une erreur s'est produite... ";
      }
      return {errorMessage, success: false}
      
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMessage:"Serveur inaccessible...\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
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
    console.log("[signup]", response.status);
    const data = await response.json();
    console.log("[signup]", data);
    if (response.status===201) {
      return {...data, success: true};
    } else {

      let errorMessage;
      if (typeof data?.error === "string") {
        errorMessage=data.error
      } else {
        errorMessage="Une erreur s'est produite... L'adresse email est peut-être déjà associée à un compte";
      }
      return {errorMessage, success: false}

    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMessage:"Serveur inaccessible !\n Nos équipes mettent tout en oeuvre pour résoudre le problème",
    };
  }
}

// Enregistrer le type de cursus et la moyenne au bac de l'utilisateur
export async function storeUserSetting(cursustype, userFiliere, moyBac) {
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
      filiere: userFiliere,
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
      return {...data, success: false};
    }
  } catch (error) {
    console.error("[STORE_USER_SETTING]", error);
    return {
      success: false,
      error: "L'enregistrement des données renseignées à échoué"
    };
  }
}

export async function storeUserStudyYear(cursustype, studyYear) {
  let authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
    body: JSON.stringify({
      cursusType: cursustype,
      studyYear: studyYear,
    }),
  };

  try {
    let response = await fetch(route + "/storeStudyYear", requestOptions);
    console.log("[STORE_USER_STUDY_YEAR]", response.status);
    const data = await response.json();
    console.log("[STORE_USER_STUDY_YEAR]", data);
    if (response.status === 200) {
      return {...data, success: true};
    } else {
      console.error("[STORE_USER_STUDY_YEAR]", data.error);
      return {...data, success: false};
    }
  } catch (error) {
    console.error("[STORE_USER_STUDY_YEAR]", error);
    return {
      success: false,
      error: "L'enregistrement des données renseignées à échoué"
    };
  }
}

// ==================== password forgotten ====================================


export async function sendRecoveryCode(email) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  };

  try {
    const response = await fetch(route + "/sendRecoveryCode", requestOptions);
    console.log("[sendRcoveryCode]", response.status);
    const data = await response.json();
    console.log("[sendRecoveryCode]", data);
    if (response.status===200) {
      return {...data, success: true};
    } else {
      return {...data, success: false};
    }
  } catch (error) {
    console.error("[sendRecoveryCode]", error);
    return {
      success: false,
      message:
        "L'envoit du code a échoué.",
    };
  }
}






export async function verifyRecoveryCode(email, code) {

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code: parseInt(code),
      // email: "achille.972@hotmail.com",
      // code: ("100336"),
    }),
  };

  try {
    let response = await fetch(route + "/verifyRecoveryCode", requestOptions);
    console.log("[verifyRecoveryCode]", response.status);
    const data = await response.json();
    console.log("[verifyRecoveryCode]", data);
    if (response.status === 200) {
      return {...data, success: true};
    } else {
      console.error("[verifyRecoveryCode]", data.error);
      return {...data, success: false};
    }
  } catch (error) {
    console.error("[verifyRecoveryCode]", error);
    return {
      success: false,
      error: "La vérifification à échoué"
    };
  }
}


export async function recoverAccount(recoveryToken, newPassword) {

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + recoveryToken,
    },
    body: JSON.stringify({
      newPassword,
    }),
  };

  try {
    let response = await fetch(route + "/recoverAccount", requestOptions);
    console.log("[recoverAccount]", response.status);
    const data = await response.json();
    console.log("[recoverAccount]", data);
    if (response.status === 200) {
      return {...data, success: true};
    } else {
      console.error("[recoverAccount]", data.error);
      return {...data, success: false};
    }
  } catch (error) {
    console.error("[recoverAccount]", error);
    return {
      success: false,
      error: "La modification du mot de passe a échoué"
    };
  }
}