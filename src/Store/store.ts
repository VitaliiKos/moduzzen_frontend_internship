import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {authReducer, companyActivitiesReducer, companyReducer, mainReducer, quizReducer, } from "./slice";


const rootReducer = combineReducers({
    mainReducer,
    authReducer,
    companyReducer,
    companyActivitiesReducer,
    quizReducer,
})

export const mainStore = () => configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof mainStore>
export type AppDispatch = AppStore["dispatch"]