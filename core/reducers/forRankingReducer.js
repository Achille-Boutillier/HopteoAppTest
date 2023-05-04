import { createSlice } from "@reduxjs/toolkit";
import { initialForRankingState } from "../store/forRankingState";

export const forRankingSlice = createSlice({
  name: "forRanking",
  initialState: initialForRankingState,
  reducers: {
    getForRankingRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    getForRankingSuccess: (state, action) => {
      const {cards, schoolIdObj} = action.payload
      state.cards = cards ;
      state.schoolIdObj = schoolIdObj;
      state.loading = false;
      state.error = false;
    },
    getForRankingFailure: (state, action) => {
      state.loading = false;
      state.error = true; // payload contient l'argument passé au dispatch
    },
  },
});

export const {
  getForRankingRequest,
  getForRankingSuccess,
  getForRankingFailure,
} = forRankingSlice.actions;

export default forRankingSlice.reducer;
