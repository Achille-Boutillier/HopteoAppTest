

import { handleAllSwipeSent } from "../core/reducers/swipeReducer";
import store from "../core";
import { reinitialiseSchoolReducer } from "../core/reducers/schoolReducer";
import { reinitialiseForRankingReducer } from "../core/reducers/forRankingReducer";
import { reinitialiseSwipeReducer } from "../core/reducers/swipeReducer";
import { reinitialiseUserSettingReducer } from "../core/reducers/userSettingReducer";
import { getAuthData } from "./controllers/userData";

export async function updateBackData(dispatch) {
  const userSettingReducer = store.getState().userSettingReducer;
  const {notSentToBackAnswers, swipeTypeObj, removedIdStillInBackEnd} = store.getState().swipeReducer;
  const {rankSchoolList, schoolLikeToUpdate, likedSchoolObject} = store.getState().schoolReducer;

  const isUpdateNeeded = notSentToBackAnswers.length>0 || removedIdStillInBackEnd.length>0 || schoolLikeToUpdate.length > 0 ;

  if (isUpdateNeeded) {
    console.log("backData needs to be updated ===================");

    const filteredSwipeTypeObj = notSentToBackAnswers.reduce((obj, key) => {
      if (swipeTypeObj.hasOwnProperty(key)) {
        obj[key] = swipeTypeObj[key];
      }
      return obj;
    }, {});

    const filteredSchoolLikeObj = schoolLikeToUpdate.reduce((obj, key) => {
      if (likedSchoolObject.hasOwnProperty(key)) {
        obj[key] = likedSchoolObject[key];
      }
      return obj;
    }, {});

  // console.log("[removedIdStillInBackEnd]", filteredSwipeTypeObj);

    const success = await sendToBack(notSentToBackAnswers, filteredSwipeTypeObj, removedIdStillInBackEnd, userSettingReducer, filteredSchoolLikeObj, rankSchoolList);

    if (success) {
      dispatch(handleAllSwipeSent());
    } else {
      console.log("couldn't update backEnd swipe answers");
    }
    
  } else {
    console.log("backEnd swipe answers update is not needed")
  }
}



async function sendToBack(notSentToBackAnswers, filteredSwipeTypeObj, removedIdStillInBackEnd, userSettingStatus, filteredSchoolLikeObj, rankSchoolList) {
  try {
    const authData = await getAuthData();
    const {cursustype, userFiliere} = userSettingStatus;
   

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authData.token,
        cursustype,
        filiere: userFiliere,
      },
      body: JSON.stringify({
        idCardList : notSentToBackAnswers, 
        swipeTypeObj : filteredSwipeTypeObj,
        unSwipedCardId : removedIdStillInBackEnd,
        schoolLikeObj: filteredSchoolLikeObj,
        schoolRankList: rankSchoolList,
      }),
    };

    const response = await fetch("https://app.hopteo.com/api/v1/user/storeUserAction", requestOptions);
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


export function resetAllStore(dispatch){
  dispatch(reinitialiseSchoolReducer());
  dispatch(reinitialiseForRankingReducer());
  dispatch(reinitialiseSwipeReducer());
  dispatch(reinitialiseUserSettingReducer());
}