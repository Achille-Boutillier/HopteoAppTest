import { createSlice } from "@reduxjs/toolkit";
import { initialCardState } from "../store/cardState";

export const cardSlice = createSlice({
  name: "allCard",
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
    // getDetailRequest: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // getDetailSuccess: (state, action) => {
    //   state.card = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // getDetailFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload; // payload contient l'argument passé au dispatch
    // },
  },
});

export const { getCardRequest, getCardSuccess, getCardFailure } =
  cardSlice.actions;

export default cardSlice.reducer;
