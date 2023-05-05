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
      schoolId.map((item)=> {state.schoolsData[item] = {...state.schoolsData[item] , ...action.payload[item]} })    
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
      state.error = true; // payload contient l'argument passé à la fonction du dispatch
    },

    //----------------------like-------------------------------------

    setSchoolLike: (state, action) => {
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

    calculNewRank: (state) => {
      state.loading = true;
      state.error = false;
    },
    calculNewRankSuccess: (state, action) => { 
      console.log("storing new rank -----------------")  ;
      const {sortedSchoolList, message} = action.payload;  
      if (Array.isArray(sortedSchoolList)) {
        const idList = [];
        sortedSchoolList.map((item) => {
          idList.push(item.id);
          if (state.schoolsData[item.id]) {   // si ecole déjà storée
            state.schoolsData[item.id].rank = item.rank;
          } else {
            state.schoolsData[item.id]={};
            state.schoolsData[item.id].rank = item.rank;
          }
        });
        state.rankIdList = idList;
      } else if (message) {
        state.rankIdList = message;
      } else {
        state.rankIdList = "Un Problème est survenu";
      }
      console.log("[rankIdList]" , state.rankIdList)
      state.loading = false;
      state.error = false;
    },
    calculNewRankFailure: (state, action) => {
      state.rankIdList = action.payload;
      state.loading = false;
      state.error = true; 
    },



    // -------------------- Explore ----------------------------------

    getSchoolByAreaRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSchoolByAreaSuccess: (state, action) => {
      if (action.payload.schoolPack) {
        const {schoolPack, listFormation} = action.payload;
        state.schoolByArea = {schoolPack, listFormation, message: null};
      } else if (action.payload.message) {
        state.schoolByArea = {message: action.payload.message}
      } 
      // state.schoolByArea = action.payload;          // schoolByArea={schoolPack: null, listFormation: null},
      state.loading = false;
      state.error = false;
    },
    getSchoolByAreaFailure: (state, action) => {
      state.loading = false;
      state.error = true; 
    },

  },
});

export const {
  calculNewRank, calculNewRankSuccess, calculNewRankFailure, 
  setSchoolLike, setSchoolLikeFailure, 
  getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure, 
  getSchoolPageRequest, getSchoolPageSuccess, getSchoolPageFailure,
  getSchoolByAreaRequest, getSchoolByAreaSuccess, getSchoolByAreaFailure,
} = schoolSlice.actions;
export default schoolSlice.reducer;
