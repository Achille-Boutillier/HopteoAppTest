// Controller de l'accueil de l'application

import { mainUrl, getAuthData, getUserSettingStatus } from "./userData";
const route = mainUrl + "/cards";


// Obtenir 2 propositions pour initialiser la pile tinde

export async function nextPile(nextIdCardList) {
  const authData = await getAuthData();
  const nextIdCardString = nextIdCardList.join(",");
  console.log("[nextIdCardsString]", nextIdCardString);

  const {cursustype, filiere} = getUserSettingStatus();
  
  

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
      filiere: filiere,
      
    },
  };

  try {
    const response = await fetch(route + `/nextPile/${nextIdCardString}`, requestOptions);
    console.log(response.status);
    const data = await response.json();
    if (response.status===200) {
      return data;
    } else {
      return {error: "Un problème est survenu avec le serveur" }
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return {error: "Un problème est survenu avec le serveur" };
  }
}

export async function swipeHandler(idCard, swipeType) {
  const authData = await getAuthData();
  console.log("[authData]", authData);
  console.log("[id]", idCard);
  console.log("[swipeType]", swipeType);

  const {cursustype, filiere} = getUserSettingStatus();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
      filiere: filiere,
    },
    body: JSON.stringify({
      idCard: idCard,
      swipeType: swipeType,
    }),
  };

  try {
    const response = await fetch(route + "/onSwipe", requestOptions);
    console.log(response.status);
    
    const data = await response.json();
    if (response.status===200) {
      return true;
    } else {
      return false
    }
  } catch (error) {
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}

export async function getDetails(idCard) {
  const authData = await getAuthData();
  const {cursustype, filiere} = getUserSettingStatus();
  
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
      filiere: filiere,
    },
  };

  try {
    const response = await fetch(route + `/detail/${idCard}`, requestOptions);
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
