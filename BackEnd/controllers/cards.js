// Controller de l'accueil de l'application

import { mainUrl } from "./userData";
const route = mainUrl + "/cards";

import { getAuthData } from "./userData";

// Obtenir 2 propositions pour initialiser la pile tinde

export async function getProposition() {
  const authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    const response = await fetch(route + "/listProposition", requestOptions);
    console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return { error };
  }
}

export async function swipeHandler(id, swipeType) {
  const authData = await getAuthData();
  console.log("[authData]", authData);
  console.log("[id]", id);
  console.log("[swipeType]", swipeType);

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
    body: JSON.stringify({
      // propId: "proposition1",
      propId: id,
      swipeType: swipeType,
      // swipeType: "like",
    }),
  };

  try {
    const response = await fetch(route + "/onSwipe", requestOptions);
    console.log(response.status);
    const data = await response.json();
    // console.log("[swipeHandler]", data)
    console.log("[swipeHandler] : ", data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

export async function getDetails(propId) {
  const authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    const response = await fetch(route + `/detail/${propId}`, requestOptions);
    console.log(response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

// Revenir en arrière pour annuler un swipe
export async function unDoSwipe() {
  const authData = await getAuthData();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    const response = await fetch(route + "/unDoSwipe", requestOptions);
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
