import { createSlice } from "@reduxjs/toolkit";
import { initialSchoolState } from "../store/schoolState";

export const schoolSlice = createSlice({
  name: "school",
  initialState: initialSchoolState,
  reducers: {


    // ------------ banner -------------------------
    getSchoolBannerRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSchoolBannerSuccess: (state, action) => {
      const schoolId = Object.keys(action.payload);
      schoolId.map((item)=> {state.schoolsData[item] = action.payload[item] })    // ! {ingeSchool1 : {..., id: ingeSchool1}, ...}
      state.loading = false;
      state.error = null;
    },
    getSchoolBannerFailure: (state, action) => {
      state.loading = false;
      state.error = true; // payload contient l'argument passé au dispatch
    },

    //----------------------page ecole-------------------------------------

    getSchoolPageRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSchoolPageSuccess: (state, action) => {
      const {schoolId, data} = action.payload
      console.log("[schoolPagereducer]", data);
      console.log("[schoolPagereducer]", schoolId);

      state.schoolsData[schoolId] = {...state.schoolsData[schoolId], ...data};
      console.log("[schoolPagereducer]", state.schoolsData[schoolId]);

      state.loading = false;
      state.error = false;
    },
    getSchoolPageFailure: (state, action) => {
      state.loading = false;
      state.error = true; // payload contient l'argument passé au dispatch
    },

    //----------------------like-------------------------------------

    setSchoolLikeSuccess: (state, action) => {
      const {schoolId, newLike } = action.payload;
      state.schoolsData[schoolId].like = newLike ;
      state.error = false;
    },
    
    setSchoolLikeFailure: (state, action) => {
      const {schoolId, newLike } = action.payload;
      state.schoolsData[schoolId].like = !newLike ;
      state.loading = false;
      state.error = true; 
    },

    // --------------------rank----------------------------

    getRankRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    getRankSuccess: (state, action) => {
      if (Array.isArray(action.payload)) {
        const idList = [];
        action.payload.map((item) => {
          idList.push(item.id);
          if (state.schoolsData[item.id]) {
            state.schoolsData[item.id].rank = item.rank;
          }
        });
        state.rankIdList = idList;
      } else {
        state.rankIdList = action.payload;
      }
      state.loading = false;
      state.error = false;
    },
    getRankFailure: (state, action) => {
      state.loading = false;
      state.error = true; // payload contient l'argument passé au dispatch
    },


  },
});

export const {
  getRankRequest, getRankSuccess, getRankFailure, 
  setSchoolLikeSuccess, setSchoolLikeFailure, 
  getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure, 
  getSchoolPageRequest, getSchoolPageSuccess, getSchoolPageFailure,
} = schoolSlice.actions;
export default schoolSlice.reducer;
