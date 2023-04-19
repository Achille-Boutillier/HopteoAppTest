import { createSlice } from "@reduxjs/toolkit";
import { initialCardState } from "../store/cardState";

export const cardSlice = createSlice({
  name: "card",
  initialState: initialCardState,
  reducers: {
    getCardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCardSuccess: (state, action) => {
      const { id, card } = action.payload;
      state.allCard[id] = card;
      state.loading = false;
      state.error = null;
    },
    getCardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },


    initCardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    initCardSuccess: (state, action) => {
      const {answeredCardList, idCardsList, minSwipeForRanking} = action.payload
      state.answeredCardList = answeredCardList;
      state.idCardsList = idCardsList;
      state.minSwipeForRanking = minSwipeForRanking;
      state.loading = false;
      state.error = null;
    },
    initCardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },
  },
});

export const { getCardRequest, getCardSuccess, getCardFailure, initCardRequest, initCardSuccess, initCardFailure } =
  cardSlice.actions;

export default cardSlice.reducer;
