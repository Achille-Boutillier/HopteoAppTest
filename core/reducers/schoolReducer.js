import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../store/schoolState";

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    getSchoolRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSchoolSuccess: (state, action) => {
      state.schoolList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSchoolFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },
    setSchoolLike: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSchoolLikeSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.schoolList = action.payload;
    },
    setSchoolLikeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getSchoolRequest,
  getSchoolSuccess,
  getSchoolFailure,
  setSchoolLike,
  setSchoolLikeFailure,
  setSchoolLikeSuccess,
} = schoolSlice.actions; // ? pk actions au pluriel ????
export default schoolSlice.reducer;
