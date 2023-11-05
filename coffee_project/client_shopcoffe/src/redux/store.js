import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/userSlices'

export const store = configureStore({
    reducer:{
        userSlice,
    }
});