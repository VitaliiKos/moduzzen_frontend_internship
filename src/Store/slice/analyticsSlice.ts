import {createSlice, createAsyncThunk, isRejectedWithValue, isFulfilled} from "@reduxjs/toolkit";
import {IError, IUserSystemRating} from "../../interfaces";
import {analyticsService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    error: IError | null,
    userSystemrating: number | null
}

const initialState: IState = {
    error: null,
    userSystemrating: null
}


const userRatingInSyster = createAsyncThunk<IUserSystemRating, { user_id: number }>(
    'analyticsSlice/userRatingInSyster',
    async ({user_id}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.getUserSystemRating(user_id)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(userRatingInSyster.fulfilled, (state, action) => {
                state.userSystemrating = action.payload.average_score
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IError;
            })

    }
});
const {actions, reducer: analyticsReducer} = analyticsSlice;
const analyticsActions = {
    ...actions,
    userRatingInSyster,
};

export {analyticsReducer, analyticsActions}