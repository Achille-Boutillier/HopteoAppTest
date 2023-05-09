import { createSlice } from "@reduxjs/toolkit";
import { initialSwipeState } from "../store/swipeState";

export const swipeSlice = createSlice({
  name: "swipe",
  initialState: initialSwipeState,
  reducers: {
    splashSwipeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    splashSwipeSuccess: (state, action) => {
      const {answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj, answerByTheme, swipeSettings } = action.payload
      state.idCardsList = idCardsList;
      state.minSwipeForRanking = minSwipeForRanking;
      state.swipeTypeObj = swipeTypeObj;
      // state.answeredCardList = answeredCardList;   
      // console.log("[answerByTheme]" , answerByTheme);
      state.sentToBackAnswers = answeredCardList;
      state.answerByTheme = answerByTheme;
      state.swipeSettings = swipeSettings;
      state.loading = false;
      state.error = null;
    },
    splashSwipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },



    storeNewSwipe: (state, action) => {
      const {id, swipeType, idTheme} = action.payload;
      state.swipeTypeObj[id] = swipeType;
      state.answerByTheme[idTheme] ? state.answerByTheme[idTheme]  += 1 : state.answerByTheme[idTheme] = 1 ;
      state.notSentToBackAnswers.push(id);
      // console.log("[answerByTheme]" , answerByTheme);

    },
    removeSwipe: (state, action) => {
      const {id, idTheme} = action.payload;
      delete state.swipeTypeObj[id] ;
      state.answerByTheme[idTheme]>0 ? state.answerByTheme[idTheme] -= 1 : null ;
      if (state.notSentToBackAnswers.length===0) {
        state.sentToBackAnswers.pop();
      } else {
        state.notSentToBackAnswers.pop();
      }
    },
    
    storeRankingAbsoluteIndex : (state, action) => {
      state.rankingAbsoluteIndex = action.payload;
    },

    removeAllSwipe: (state) => {
      state.swipeTypeObj = {};
      state.sentToBackAnswers = [];
      state.notSentToBackAnswers = [];
      state.answerByTheme = {};
      state.rankingAbsoluteIndex = -1;
    },

    reinitialiseSwipeReducer: (state) => {
      state.swipeTypeObj = {};         // {ingeCard1: "like", ingeCard2: "dislike", ingeCard3: "dontKnow"}
      state.idCardsList= [];          // [ingeCard1, ingeCard2, ingeCard3, ingeCard4, ingeCard5, ...]
      state.sentToBackAnswers= [];    // [ingeCard1, ingeCard2]
      state.notSentToBackAnswers= []; // [ingeCard3]
      state.minSwipeForRanking= null;
      state.swipeSettings= {};        // {"superlike": {"bonus": 5,"nbAnswer": 5}, "like": {"bonus": 1,"nbAnswer": 1 }, ... },
      state.answerByTheme= {};        // "answerByTheme": {"theme1": 19, "theme3": 10, "theme2": 1}
      state.rankingAbsoluteIndex= -1;  
      state.loading= null;
      state.error= null;
    }
  },
});

export const { splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure, storeNewSwipe, removeSwipe, 
  storeRankingAbsoluteIndex, removeAllSwipe, reinitialiseSwipeReducer } =
  swipeSlice.actions;

export default swipeSlice.reducer;
