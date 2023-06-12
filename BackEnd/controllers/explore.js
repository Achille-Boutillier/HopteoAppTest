// Controller de la page Explore

import { getAuthData, mainUrl, getUserSettingStatus } from "./userData";
import { getSchoolByAreaFailure, getSchoolByAreaRequest, getSchoolByAreaSuccess } from "../../core/reducers/schoolReducer";


const route = mainUrl + "/explore";



export async function getSchoolByArea() {
  // dispatch(getSchoolByAreaRequest());


  const authData = await getAuthData();
  const {cursustype} = getUserSettingStatus();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype,
    },
  };

  try {
    const response = await fetch(route + "/schoolByArea", requestOptions);
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      // dispatch(getSchoolByAreaSuccess(data));
      return {...data, success: true};
    } else {
      // dispatch(getSchoolByAreaFailure());
      return {...data, success: false};
    }
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return {success: false, message:  "Un problème est survenu avec le serveur..."};
  }
}




//----------------------------------------------------
// export async function getAllSchool() {
//   const authData = await getAuthData();

//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + authData.token,
//     },
//   };

//   try {
//     const response = await fetch(route + "/AllSchools/", requestOptions);
//     // console.log(response.status);
//     const data = await response.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.log("echec du bloc try :");
//     console.log(error);
//     return { error };
//   }
// }

export async function searchSchool(enteredText) {
  try {
  const authData = await getAuthData();
  const {cursustype} = getUserSettingStatus();


  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
      cursustype,
    },
  };  
    const response = await fetch(route + "/searchSchool/" + enteredText, requestOptions);
    console.log("[searchSchool]", response.status);
    const data = await response.json();
    // console.log(data);
    if (response.status===200) {
      return {...data, success: true}
    } else {
      return {...data, success: false}
    }
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return { error: "Une erreur est survenue", success: false };
  }
}
