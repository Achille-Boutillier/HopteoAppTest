// Controller de l'accueil de l'application

import { mainUrl } from "./userData";
const route = mainUrl + "/cards";

import { getUserToken } from "./userData";

// Obtenir 2 propositions pour initialiser la pile tinde

export async function getProposition() {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
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
    return { error: error };
  }
}

export async function swipeHandler(propId, routeEnd) {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    body: JSON.stringify({
      propId: propId,
    }),
  };

  try {
    const response = await fetch(route + routeEnd, requestOptions);
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

// Revenir en arrière pour annuler un swipe
export async function unDoSwipe() {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
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
