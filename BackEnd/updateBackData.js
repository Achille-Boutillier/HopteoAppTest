
import { updateSwipe } from "./controllers/cards";
import { handleAllSwipeSent } from "../core/reducers/swipeReducer";
import store from "../core";
import { reinitialiseSchoolReducer } from "../core/reducers/schoolReducer";
import { reinitialiseForRankingReducer } from "../core/reducers/forRankingReducer";
import { reinitialiseSwipeReducer } from "../core/reducers/swipeReducer";
import { reinitialiseUserSettingReducer } from "../core/reducers/userSettingReducer";

export async function updateBackData(dispatch) {
  const userSettingReducer = store.getState().userSettingReducer;
  const {notSentToBackAnswers, swipeTypeObj, removedIdStillInBackEnd} = store.getState().swipeReducer;
  const {schoolLikeToUpdate, likedSchoolObject} = store.getState().schoolReducer;

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

    const success = await updateSwipe(notSentToBackAnswers, filteredSwipeTypeObj, removedIdStillInBackEnd, userSettingReducer, filteredSchoolLikeObj);

    if (success) {
      dispatch(handleAllSwipeSent());
    } else {
      console.log("couldn't update backEnd swipe answers");
    }
    
  } else {
    console.log("backEnd swipe answers update is not needed")
  }
}


export function resetAllStore(dispatch){
  dispatch(reinitialiseSchoolReducer());
  dispatch(reinitialiseForRankingReducer());
  dispatch(reinitialiseSwipeReducer());
  dispatch(reinitialiseUserSettingReducer());
}