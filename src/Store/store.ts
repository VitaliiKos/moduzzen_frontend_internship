import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, companyReducer, mainReducer, } from "./slice";


const rootReducer = combineReducers({
    mainReducer,
    authReducer,
    companyReducer,
})

export const mainStore = () => configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof mainStore>
export type AppDispatch = AppStore["dispatch"]