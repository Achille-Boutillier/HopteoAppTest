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
      console.log("[schoolIdObj]", schoolIdObj)
      state.cards = cards ;
      state.schoolIdObj = schoolIdObj;
      state.loading = false;
      state.error = false;
    },
    getForRankingFailure: (state, action) => {
      state.loading = false;
      state.error = true; // payload contient l'argument passé au dispatch
    },


    reinitialiseForRankingReducer: (state) => {
      state.cards = {} ;
      state.schoolIdObj = {} ;
      state.loading = null;
      state.error = false;
    },

    toggleShowRankingPopup: (state) => {
      state.showRankingPopup = !state.showRankingPopup;
    },

    setRankingFilters: (state, action) => {
      const {filterName, selectedFilterList} = action.payload;
      state.activeFilterObject[filterName] = selectedFilterList;
    }
  
  },
});

export const {
  getForRankingRequest,
  getForRankingSuccess,
  getForRankingFailure,
  reinitialiseForRankingReducer,
  toggleShowRankingPopup,
  setRankingFilters,
} = forRankingSlice.actions;

export default forRankingSlice.reducer;
