// Controller de la page Explore

import { mainUrl } from "./userData";
const route = mainUrl + "/explore";

import { getUserToken } from "./userData";

export async function getAllSchool() {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
  };

  try {
    const response = await fetch(route + "/AllSchools/", requestOptions);
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return { error };
  }
}

export async function searchSchool(enteredText) {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
  };

  console.log(route + `/searchSchool/${enteredText}`);
  try {
    const response = await fetch(
      route + `/searchSchool/${enteredText}`,
      requestOptions
    );
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
