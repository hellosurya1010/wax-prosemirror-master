import { referenceElementReducer } from "./referenceElementSlice";
import { userReducer } from "./userSlice";

const { configureStore, combineReducers } = require("@reduxjs/toolkit");


const rootReducer = combineReducers({
    user: userReducer,
    referenceElements: referenceElementReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});