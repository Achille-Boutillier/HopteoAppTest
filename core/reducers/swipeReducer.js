import { createSlice } from "@reduxjs/toolkit";
import { initialSwipeState } from "../store/swipeState";

export const swipeSlice = createSlice({
  name: "swipe",
  initialState: initialSwipeState,
  reducers: {
    // getCardRequest: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // getCardSuccess: (state, action) => {
    //   const { id, card } = action.payload;
    //   state.allCard[id] = card;
    //   state.loading = false;
    //   state.error = null;
    // },
    // getCardFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload; // payload contient l'argument passé au dispatch
    // },


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
    
  },
});

export const { splashSwipeRequest, splashSwipeSuccess, splashSwipeFailure, storeNewSwipe, removeSwipe } =
  swipeSlice.actions;

export default swipeSlice.reducer;
