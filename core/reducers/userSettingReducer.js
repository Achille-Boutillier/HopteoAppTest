import { createSlice } from "@reduxjs/toolkit";
import { initialUserSettingState } from "../store/userSettingState";

export const userSettingSlice = createSlice({
  name: "userSetting",
  initialState: initialUserSettingState,
  reducers: {
    getUserSettingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSettingSuccess: (state, action) => {
      const {filiere, secondYearFiliere, cursustype} = action.payload;
      state.filiere = filiere;
      state.secondYearFiliere = secondYearFiliere;
      state.cursustype = cursustype;
      state.loading = false;
      state.error = null;
    },
    getUserSettingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // payload contient l'argument passé au dispatch
    },


    reinitialiseUserSettingReducer: (state) => {
      state.filiere = "";
      state.secondYearFiliere = [];
      state.cursustype = "";
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  getUserSettingRequest,
  getUserSettingSuccess,
  getUserSettingFailure,
  reinitialiseUserSettingReducer,
} = userSettingSlice.actions;

export default userSettingSlice.reducer;
