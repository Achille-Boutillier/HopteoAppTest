// Controller de la page classement

// import { getAuthData } from "./userData";
// import {getRankRequest, getRankSuccess, getRankFailure} from "../../core/reducers/schoolReducer";
import {getAuthData, mainUrl, getUserSettingStatus } from "./userData";
import store from "../../core";
const route = mainUrl + "/ranking";


// Fournir le classement des écoles
export async function getSchoolRanking() {
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
  };

  try {
    const response = await fetch(route + "/generate", requestOptions);
    console.log(response.status)
    const data = await response.json();
    console.log("[getSchoolRanking()]",data);
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





// ! fonction inutiles : ----------------------------------------------------

// Afficher une école depuis la page du classement
// export async function getSchool(schoolId) {
//   console.log("je rentre dans getSchool(id)");
//   console.log("[schoolId]", schoolId);
//   const authData = await getAuthData();
//   console.log(["[authData]", authData]);

//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + authData.token,
//     },
//   };

//   try {
//     const response = await fetch(
//       route + `/schoolRanking/${schoolId}`,
//       requestOptions
//     );
//     console.log("[getSchool]", response.status);
//     const data = await response.json();
//     console.log("[getSchool]", data);
//     console.log("[admission]", data.admission);
//     return data;
//   } catch (error) {
//     console.log("echec du bloc try :");
//     console.log(error);
//     return false;
//   }
// }



// function setLike(schoolList, id) {
//   // console.log(["TEEEESST"], store.getState());
//   console.log("[SCHOOLLIST]", schoolList);
//   const index = schoolList.findIndex((school) => school.id === id);
//   console.log("[INDEX]", index);
//   console.log("[ID]", id);
//   if (index === -1) {
//     console.error("Ecole non trouvée");
//     return; // ! Attention si error, la schoolList sera ecrasée
//   }
//   schoolList[index].like = !schoolList[index].like; // ! pbm : en mettant à jour l'état du redux, schoolList devient vide
//   return schoolList;
// }

// export async function onSchoolLike2(dispatch, schoolId, bool) {
//   const authData = await getAuthData();

//   const requestOptions = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + authData.token,
//     },
//     body: JSON.stringify({
//       bool: !bool,
//     }),
//   };
//   return async () => {
//     dispatch(getSchoolRequest());
//     console.log("[LIKE] initial", store.getState());
//     try {
//       dispatch(setSchoolLike());
//       fetch(route + `/onSchoolLike/${schoolId}`, requestOptions)
//         .then(async (response) => {
//           const data = await response.json();
//           const newList = setLike(store.getState().schoolList, schoolId);
//           console.log("[NEWLIST]", newList);
//           dispatch(setSchoolLikeSuccess(newList));
//           console.log("[LIKE] success", store.getState()); //store.getState().schoolList pour choper la clé schoolList
//         })
//         .catch((error) => {
//           dispatch(setSchoolLikeFailure(error));
//           console.log("[LIKE] echecs", store.getState());
//         }); // console.log(response.status)
//       // console.log(data);
//     } catch (error) {
//       console.log("echec du bloc try :");
//       console.log(error);
//       dispatch(setSchoolLikeFailure(error));
//       console.log("[LIKE] echecs", store.getState());
//     }
//   };
// }

// export async function getLikeValue(schoolId) {
//   const authData = await getAuthData();
//   console.log("yayyayayayayayayayayayayayayaya");

//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + authData.token,
//     },
//   };

//   try {
//     const response = await fetch(
//       route + `/isSchoolLiked/${schoolId}`,
//       requestOptions
//     );
//     console.log(
//       "passe dans isSchoolLiked() -------------------------------------"
//     );
//     console.log(response.status);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log("echec du bloc try :");
//     console.log(error);
//     return { error };
//   }
// }

// todo : implementer isFocused plutôt que addListener("focus");

// const isFocused = useIsFocused();

//   useEffect(() => {
//     // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
//   }, [isFocused]);
