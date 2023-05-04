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
      // state.answeredCardList = answeredCardList;
      state.idCardsList = idCardsList;
      state.minSwipeForRanking = minSwipeForRanking;
      state.swipeTypeObj = swipeTypeObj;
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
      state.answerByTheme[idTheme] += 1 
    },
    removeSwipe: (state, action) => {
      const {id, idTheme} = action.payload;
      delete state.swipeTypeObj[id] ;
      state.answerByTheme[idTheme]>0 ? state.answerByTheme[idTheme] -= 1 : null ;
    },
    

    storeRankingAbsoluteIndex : (state, action) => {
      state.rankingAbsoluteIndex = action.payload;
    }
  },
});

export const { splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure, storeNewSwipe, removeSwipe, storeRankingAbsoluteIndex } =
  swipeSlice.actions;

export default swipeSlice.reducer;
