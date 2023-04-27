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
      const {answeredCardList, idCardsList, minSwipeForRanking, swipeTypeObj, } = action.payload
      // state.answeredCardList = answeredCardList;
      state.idCardsList = idCardsList;
      state.minSwipeForRanking = minSwipeForRanking;
      state.swipeTypeObj = swipeTypeObj;
      state.sentToBackAnswers = answeredCardList;
      state.loading = false;
      state.error = null;
    },
    splashSwipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },


    
    storeNewSwipe: (state, action) => {
      const {id, swipeType} = action.payload
      state.swipeTypeObj[id] = swipeType
    },
    removeSwipe: (state, action) => {
      const id = action.payload
      delete state.swipeTypeObj[id] 
    },
    

    storeRankingAbsoluteIndex : (state, action) => {
      state.rankingAbsoluteIndex = action.payload;
    }
  },
});

export const { splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure, storeNewSwipe, removeSwipe, storeRankingAbsoluteIndex } =
  swipeSlice.actions;

export default swipeSlice.reducer;
