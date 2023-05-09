// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store"; // voir doc expo pour ios (peut etre une props a set to false)
import { mainUrl } from "./userData";
const route = mainUrl + "/setting";
import { getAuthData } from "./userData";
import { resetRank } from "../../core/reducers/schoolReducer";
import { removeAllSwipe } from "../../core/reducers/swipeReducer";

export async function getUserInfo() {
  let authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    let response = await fetch(route + "/userInfo", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

export async function getAppInfo() {
  // let authData = 0
  let authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    let response = await fetch(route + "/aboutUs", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return error;
  }
}

export async function getPrivacyPolicy() {
  let authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    let response = await fetch(route + "/privacyPolicy", requestOptions);
    console.log(response.status);
    const html = await response.text();
    return html;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return { error: "Echec de la requete" };
  }
}

export async function getAppContact() {
  let authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    let response = await fetch(route + "/contactUs", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

export async function modifyPassword(currentPassword, newPassword) {
  let authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
    body: JSON.stringify({
      password: currentPassword,
      newPassword: newPassword,
    }),
  };

  try {
    let response = await fetch(route + "/modifyPassword", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

// Supprimer le compte de l'utilisateur
export async function deleteUser(password) {
  let authData = await getAuthData();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
    body: JSON.stringify({
      password: password,
    }),
  };

  try {
    let response = await fetch(route + "/delete", requestOptions);
    console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
    // if (data?.message==="Compte supprimé avec succès !") {
    //     return true;
    // } else {
    //     return false;
    // }
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

export async function disconnect() {
  try {
    // await AsyncStorage.removeItem("authData");
    await SecureStore.deleteItemAsync("authData");
    return true;
  } catch (error) {
    return false;
  }
}


export async function resetSwipe(password, dispatch) {
  try {

    let authData = await getAuthData();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
      },
      body: JSON.stringify({
          password: password
      })
    };
  
    let response = await fetch(route + "/resetSwipe", requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      dispatch(removeAllSwipe());
      dispatch(resetRank());
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
