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
      // const schoolId = Object.keys(action.payload);
      // schoolId.map((item)=> {
      //   state.schoolsData[item] = {...state.schoolsData[item] , ...action.payload[item]} 
      // }) 
      for (const schoolId in action.payload) {
        if (action.payload[schoolId].like) {
          state.likedSchoolObject[schoolId] = true;
          // state.likedSchoolList.push(schoolId);
        }
        delete action.payload[schoolId].like;
        state.schoolsData[schoolId] = {...state.schoolsData[schoolId] , ...action.payload[schoolId]} 

      }    
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
      newLike ? state.likedSchoolObject[schoolId] = true : delete state.likedSchoolObject[schoolId];
      // state.schoolsData[schoolId].like = newLike ;
      state.error = false;
    },
    
    // setSchoolLikeFailure: (state, action) => {
    //   const {schoolId, newLike } = action.payload;
    //   // state.schoolsData[schoolId].like = !newLike ;
    //   // newLike ? state.likedSchoolList.push(schoolId) : state.likedSchoolList = state.likedSchoolList.filter(item => item !== schoolId);
    //   state.loading = false;
    //   state.error = true; 
    // },

    // --------------------rank----------------------------

    calculNewRank: (state) => {
      console.log("[schoolsData reducer]" , state.schoolsData);
      state.loading = true;
      state.error = false;
      for (const clé in state.schoolsData) {
        delete state.schoolsData[clé]?.rank
      }
    },
    calculNewRankSuccess: (state, action) => { 
      console.log("storing new rank -----------------")  ;
      const {sortedSchoolList, message} = action.payload;  
      console.log("[sortedSchoolList]", sortedSchoolList);
      if (Array.isArray(sortedSchoolList)) {
        let idList = [];
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
      // console.log("[rankIdList]" , state.rankIdList)
      state.loading = false;
      state.error = false;
    },
    calculNewRankFailure: (state, action) => {
      state.rankIdList = action.payload;
      state.loading = false;
      state.error = true; 
    },


    resetRank: (state) => {
      state.rankIdList = null;
      Object.keys(state.schoolsData).map((item) => {
        state.schoolsData[item].rank = null;
      })
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



    reinitialiseSchoolReducer: (state) => {
      state.rankIdList= null;     // lite d'id ordonnés pour classement
      state.schoolByArea= null;   // {schoolPack: null, listFormation: null},
      state.schoolsData= {};      
      state.loading= null;
      state.error= false;
    }

  },
});

export const {
  calculNewRank, calculNewRankSuccess, calculNewRankFailure, resetRank, 
  setSchoolLike, 
  getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure, 
  getSchoolPageRequest, getSchoolPageSuccess, getSchoolPageFailure,
  getSchoolByAreaRequest, getSchoolByAreaSuccess, getSchoolByAreaFailure,
  reinitialiseSchoolReducer,
} = schoolSlice.actions;
export default schoolSlice.reducer;
