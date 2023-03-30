// Controller de la page classement

import { getUserToken } from "./userData";
import {
  actions,
  getSchoolFailure,
  getSchoolRequest,
  getSchoolSuccess,
  schoolSlice,
  setSchoolLike,
  setSchoolLikeFailure,
  setSchoolLikeSuccess,
} from "../../core/reducers/schoolReducer";
import { mainUrl } from "./userData";
import store from "../../core";
const route = mainUrl + "/classement";

export async function getSchool2(dispatch) {
  const userToken = await getUserToken();
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    // body: {}
  };

  return async () => {
    dispatch(getSchoolRequest());
    console.log("coucouuuuuuuu");
    console.log("initial", store.getState());
    try {
      const response = fetch(route + "/allSchoolRanking", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          dispatch(getSchoolSuccess(data));
          console.log("success", store.getState()); //getState("schoolLits") pour choper la clé schoolList
        })
        .catch((error) => {
          console.log("echec du bloc try :");
          console.log(error);
          dispatch(getSchoolFailure(error));
          console.log("echecs", store.getState());
        }); // console.log(response.status)
      // console.log(data);
    } catch (error) {
      console.log("echec du bloc try :");
      console.log(error);
      dispatch(getSchoolFailure(error));
      console.log("echecs", store.getState());
    }
  };
}

// Fournir le classement des écoles
export async function getSchoolRanking() {
  const userToken = await getUserToken();
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    // body: {}
  };

  try {
    const response = await fetch(route + "/allSchoolRanking", requestOptions);
    // console.log(response.status)
    const data = await response.json();
    // console.log(data);

    console.log("success", store.getState());

    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    dispatch(getSchoolFailure(error));
    console.log("echecs", store.getState());

    return { error };
  }
}

// Afficher une école depuis la page du classement
export async function getSchool(ecoleId) {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
  };

  try {
    const response = await fetch(
      route + `/schoolRanking/${ecoleId}`,
      requestOptions
    );
    // console.log(response.status);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return false;
  }
}

export async function onSchoolLike(ecoleId, bool) {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    body: JSON.stringify({
      bool: bool,
    }),
  };

  try {
    const response = await fetch(
      route + `/onSchoolLike/${ecoleId}`,
      requestOptions
    );
    // console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return error;
  }
}

function setLike(schoolList, id) {
  // console.log(["TEEEESST"], store.getState());
  console.log("[SCHOOLLIST]", schoolList);
  const index = schoolList.findIndex((school) => school.id === id);
  console.log("[INDEX]", index);
  console.log("[ID]", id);
  if (index === -1) {
    console.error("Ecole non trouvée");
    return; // ! Attention si error, la schoolList sera ecrasée
  }
  schoolList[index].like = !schoolList[index].like; // ! pbm : en mettant à jour l'état du redux, schoolList devient vide
  return schoolList;
}

export async function onSchoolLike2(dispatch, ecoleId, bool) {
  const userToken = await getUserToken();

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
    body: JSON.stringify({
      bool: !bool,
    }),
  };
  return async () => {
    dispatch(getSchoolRequest());
    console.log("[LIKE] initial", store.getState());
    try {
      dispatch(setSchoolLike());
      fetch(route + `/onSchoolLike/${ecoleId}`, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          const newList = setLike(store.getState().schoolList, ecoleId);
          console.log("[NEWLIST]", newList);
          dispatch(setSchoolLikeSuccess(newList));
          console.log("[LIKE] success", store.getState()); //store.getState().schoolList pour choper la clé schoolList
        })
        .catch((error) => {
          dispatch(setSchoolLikeFailure(error));
          console.log("[LIKE] echecs", store.getState());
        }); // console.log(response.status)
      // console.log(data);
    } catch (error) {
      console.log("echec du bloc try :");
      console.log(error);
      dispatch(setSchoolLikeFailure(error));
      console.log("[LIKE] echecs", store.getState());
    }
  };
}

export async function getLikeValue(ecoleId) {
  const userToken = await getUserToken();
  console.log("yayyayayayayayayayayayayayayaya");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + userToken.token,
    },
  };

  try {
    const response = await fetch(
      route + `/isSchoolLiked/${ecoleId}`,
      requestOptions
    );
    console.log(
      "passe dans isSchoolLiked() -------------------------------------"
    );
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("echec du bloc try :");
    console.log(error);
    return { error };
  }
}

// todo : implementer isFocused plutôt que addListener("focus");

// const isFocused = useIsFocused();

//   useEffect(() => {
//     // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
//   }, [isFocused]);
