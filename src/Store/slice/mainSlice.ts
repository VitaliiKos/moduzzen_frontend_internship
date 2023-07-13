import {createSlice} from "@reduxjs/toolkit";


interface IState {
}

const initialState: IState = {
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {},
    extraReducers:builder =>builder
})

const {reducer:mainReducer, actions} = mainSlice;

const mainAction = {
    ...actions
};
export {mainReducer, mainAction}