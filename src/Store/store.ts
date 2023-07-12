import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {mainReducer} from "./slice";


const rootReducer = combineReducers({
    mainReducer
})

export const mainStore = () => configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof mainStore>
export type AppDispatch = AppStore["dispatch"]