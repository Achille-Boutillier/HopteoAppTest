import { getAuthData } from "./userData";

import { mainUrl } from "./userData";
const route = mainUrl + "/profile";

export async function getLikedSchool() {
  const authData = await getAuthData();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authData.token,
    },
  };

  try {
    const response = await fetch(route + `/likedSchool`, requestOptions);
    // console.log("passe dans getLikedSchools()");
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
