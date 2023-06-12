// Controller de l'accueil de l'application

import store from "../../core";
import { removeSwipe, storeNewSwipe } from "../../core/reducers/swipeReducer";
import { mainUrl, getAuthData, getUserSettingStatus } from "./userData";
const route = mainUrl + "/cards";


// Obtenir 2 propositions pour initialiser la pile tinde

export async function nextPile(nextIdCardList) {
  try {

    const authData = await getAuthData();
    const nextIdCardString = nextIdCardList.join(",");
    // console.log("[nextIdCardsString]", nextIdCardString);

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

    const response = await fetch(route + `/nextPile/${nextIdCardString}`, requestOptions);
    // console.log(response.status);
    const data = await response.json();
    if (response.status===200) {
      return data;
    } else {
      throw data.error 
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return {error: "Un problème est survenu avec le serveur" };
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

// updateSwipe

export async function updateSwipe(idCardList, swipeTypeObj, removedIdStillInBackEnd, userSettingStatus) {
  try {
    const authData = await getAuthData();
    const {cursustype, filiere} = userSettingStatus;
   

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
        cursustype,
        filiere,
      },
      body: JSON.stringify({
        idCardList, 
        swipeTypeObj,
        unSwipedCardId : removedIdStillInBackEnd,
      }),
    };

    const response = await fetch("https://app.hopteo.com/api/v1/cards/addSwipes", requestOptions);
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      return true;
    } else {
      throw data;
    }
  } catch (error) {
    console.log("[updateSwipe]", "bloc try failed :");
    console.log(error);
    return false;
  }
}



// Revenir en arrière pour annuler un swipe
export async function undoSwipe(id, idTheme, dispatch) {
  const swipeType = store.getState().swipeReducer.swipeTypeObj[id];
  try {
    dispatch(removeSwipe({id, idTheme}));
    const authData = await getAuthData();
    const {cursustype, filiere} = getUserSettingStatus();

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
        cursustype,
        filiere, 
      },
      body: JSON.stringify({
        idCard: id
      }),
    };

    const response = await fetch(route + "/undoSwipe", requestOptions);
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      return true;
    } else {
      throw data;
    }
  } catch (error) {
    dispatch(storeNewSwipe({id, swipeType, idTheme}));
    console.log("bloc try failed :");
    console.log(error);
    return false;
  }
}
