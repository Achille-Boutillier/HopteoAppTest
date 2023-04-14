import { configureStore, combineReducers } from "@reduxjs/toolkit";
import schoolReducer from "./reducers/schoolReducer";
import themeReducer from "./reducers/themeReducer";
import cardReducer from "./reducers/cardReducer";
// ! syntaxe Ghassen
// const store = configureStore({
//   reducer: schoolReducer,
// });

// todo : Attention !!! store.getState().school pour obtenir l'état de schoolReducer
// todo : à modif dans classement.js
const rootReducer = combineReducers({
  // combineReducers plus performant
  schoolReducer: schoolReducer,
  themeReducer: themeReducer,
  cardReducer: cardReducer,
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
