import { getAuthData } from "./userData";
// import {getRankRequest, getRankSuccess, getRankFailure} from "../../core/reducers/schoolReducer";
import { mainUrl, getUserSettingStatus } from "./userData";
import store from "../../core";
const route = mainUrl + "/schools";



export async function getBannerData(idList) {
  const authData = await getAuthData();
  const {cursustype} = getUserSettingStatus();

  const schoolIdString = idList.join(",");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
    },
  };

  try {
    const response = await fetch(route + "/banners/" + schoolIdString, requestOptions);
    console.log(response.status)
    const data = await response.json();
    console.log("[getBannerData]",data);
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


export async function getPageData(schoolId) {
  const authData = await getAuthData();
  const {cursustype} = getUserSettingStatus();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
    },
  };

  try {
    const response = await fetch(route + "/page/" + schoolId, requestOptions);
    console.log(response.status);
    const data = await response.json();
    console.log("[getPageData()]",data);
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




export async function modifyLike(schoolId, like) {
  const authData = await getAuthData();
  const {cursustype} = getUserSettingStatus();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype: cursustype,
    },
    body: JSON.stringify({
      bool: like,
    }),
  };

  try {
    const response = await fetch(
      route + "/modifyLike/" + schoolId,
      requestOptions
    );
    // console.log(response.status);
    // const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);

    return false;
  }
}
