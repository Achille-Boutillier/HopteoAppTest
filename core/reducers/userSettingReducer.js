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
      const {filiere, secondYearFiliere, cursustype, lastAppVersion} = action.payload;
      state.filiere = filiere;
      state.secondYearFiliere = secondYearFiliere;
      state.cursustype = cursustype;
      state.lastAppVersion = lastAppVersion;
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
    },

    storeAllFiliereList : (state, action) => {
      state.filiereList = action.payload;
    }
  },
});

export const {
  getUserSettingRequest,
  getUserSettingSuccess,
  getUserSettingFailure,
  reinitialiseUserSettingReducer,
  storeAllFiliereList,
} = userSettingSlice.actions;

export default userSettingSlice.reducer;
