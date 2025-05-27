import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "../state/mapSlice";

export const store = configureStore({
    reducer: {
        map: mapReducer
    }
})