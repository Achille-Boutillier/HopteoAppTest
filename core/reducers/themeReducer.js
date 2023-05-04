import { createSlice } from "@reduxjs/toolkit";
import { initialThemeState } from "../store/themeState";

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    getThemeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getThemeSuccess: (state, action) => {
      state.themeObj = action.payload;
      state.loading = false;
      state.error = null;
    },
    getThemeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },
  },
});

export const { getThemeRequest, getThemeSuccess, getThemeFailure } =
  themeSlice.actions;

export default themeSlice.reducer;
