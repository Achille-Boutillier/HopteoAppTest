import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./reducers/schoolReducer";

const store = configureStore({
  reducer: schoolReducer,
});

export default store;
