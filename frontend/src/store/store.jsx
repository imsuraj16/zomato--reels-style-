import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import foodSlice from "./reducers/foodSlice";

export const store = configureStore({

    reducer: {
        user: userSlice,
        food: foodSlice
    }
})