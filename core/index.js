import { configureStore, combineReducers } from "@reduxjs/toolkit";
import schoolReducer from "./reducers/schoolReducer";
import themeReducer from "./reducers/themeReducer";
import swipeReducer from "./reducers/swipeReducer";
import userSettingReducer from "./reducers/userSettingReducer";
import forRankingReducer from "./reducers/forRankingReducer";

// todo : Attention !!! store.getState().school pour obtenir l'état de schoolReducer
// todo : à modif dans classement.js
const rootReducer = combineReducers({
  // combineReducers plus performant
  schoolReducer,    // syntaxe equivalente à "schoolReducer: schoolReducer"
  themeReducer,
  swipeReducer,
  userSettingReducer,
  forRankingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// ! autre syntaxe :
// const store = configureStore({
//   reducer: {
//     school : schoolReducer,
//     theme : themeReducer,
//   }
// });

export default store;
