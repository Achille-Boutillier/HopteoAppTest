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
      state.card = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },
  },
});

export const { getCardRequest, getCardSuccess, getCardFailure } =
  cardSlice.actions;

export default cardSlice.reducer;
