// Controller de la page classement

// import { getAuthData } from "./userData";
// import {getRankRequest, getRankSuccess, getRankFailure} from "../../core/reducers/schoolReducer";
import {getAuthData, mainUrl, getUserSettingStatus } from "./userData";
import store from "../../core";
const route = mainUrl + "/ranking";


// Fournir le classement des écoles
export async function getSchoolRanking() {
  try {

    const authData = await getAuthData();
    const {cursustype, filiere} = getUserSettingStatus();
    // console.log("cursusType", cursustype);
    // console.log("filiere", filiere);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
        cursustype,
        filiere,
      },
    };

    const response = await fetch(route + "/generate", requestOptions);
    // console.log(response.status)
    const data = await response.json();
    // console.log("[getSchoolRanking()]",data);
    if (response.status===200) {
      return data;
    } else {
      return { error: "erreur de requete" };
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);

    return { error: "erreur de requete" };
  }
}



export async function getRankingAlgoData() {
  try {
    const authData = await getAuthData();
    const {cursustype, filiere} = getUserSettingStatus();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
        cursustype,
        filiere,
      },
    };

    const response = await fetch(route + "/data", requestOptions);
    // console.log(response.status)
    const data = await response.json();
    // console.log("[getSchoolRanking()]",data);
    if (response.status===200) {
      return {...data, success: true};
    } else {
      return { error: "erreur de requete", success: false };
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);

    return { error: "erreur de requete", success: false };
  }
}



