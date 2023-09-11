import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    analyticsReducer,
    authReducer,
    companyActivitiesReducer,
    companyReducer,
    mainReducer,
    quizReducer,
} from "./slice";
import {notyficationsReducer} from "./slice/notyficationsSlice";


const rootReducer = combineReducers({
    mainReducer,
    authReducer,
    companyReducer,
    companyActivitiesReducer,
    quizReducer,
    analyticsReducer,
    notyficationsReducer,
})

export const mainStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof mainStore>
export type AppDispatch = AppStore["dispatch"]