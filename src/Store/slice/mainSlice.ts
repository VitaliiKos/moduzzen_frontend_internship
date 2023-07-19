import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IState {
    count:number,
    test_string: string
}

const initialState: IState = {
    count: 0,
    test_string: ''
}

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        inc: (state) => {
            state.count += 1
        },
        dec: (state) => {
            state.count -= 1
        },
        reset:(state) => {
            state.count = 0
        },
        change_string:(state, actions: PayloadAction<string> )=>{
            state.test_string = actions.payload
        }

    },
    extraReducers:builder =>builder
})

const {reducer:mainReducer, actions} = mainSlice;

const mainAction = {
    ...actions
};
export {mainReducer, mainAction}