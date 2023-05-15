
import { updateSwipe } from "./controllers/cards";
import { handleAllSwipeSent } from "../core/reducers/swipeReducer";
import store from "../core";
import { reinitialiseSchoolReducer } from "../core/reducers/schoolReducer";
import { reinitialiseForRankingReducer } from "../core/reducers/forRankingReducer";
import { reinitialiseSwipeReducer } from "../core/reducers/swipeReducer";
import { reinitialiseUserSettingReducer } from "../core/reducers/userSettingReducer";

export async function updateBackData(dispatch) {
  const userSettingReducer = store.getState().userSettingReducer;
  const {notSentToBackAnswers, sentToBackAnswers, swipeTypeObj, removedIdStillInBackEnd} = store.getState().swipeReducer;
  // console.log("[removedIdStillInBackEnd]", removedIdStillInBackEnd);
  if (notSentToBackAnswers.length>0 || removedIdStillInBackEnd.length>0) {   //todo: revoir la logique
    console.log("it needs to be upgraded ===================");
    console.log("[removedIdStillInBackEnd]", removedIdStillInBackEnd);
    const filteredSwipeTypeObj = notSentToBackAnswers.reduce((obj, key) => {
      if (key in swipeTypeObj) {
        obj[key] = swipeTypeObj[key];
      }
      return obj;
    }, {});
  // console.log("[removedIdStillInBackEnd]", filteredSwipeTypeObj);

    const success = await updateSwipe(notSentToBackAnswers, filteredSwipeTypeObj, removedIdStillInBackEnd, userSettingReducer);
    //todo : handle les removedIdStillInBackEnd

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