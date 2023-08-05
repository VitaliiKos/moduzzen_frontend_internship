import {createSlice, PayloadAction, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBaseStatus, IHealthCheck, IUserResp} from "../../interfaces";
import {userService} from "../../services";
import {IError} from "../../interfaces/error.interface";

interface IState {
    count: number,
    test_string: string,
    errors: IError
    res: IHealthCheck | null
    result: string,
    detail: string,
    status_code: number | null,
    postgres_status: boolean,
    redis_status: string,
    users: IUserResp[]
}

const initialState: IState = {
    count: 0,
    test_string: '',
    res: null,
    errors: {},
    result: '',
    detail: '',
    status_code: null,
    postgres_status: false,
    redis_status: '',
    users: []

}


const getHealthCheck = createAsyncThunk<IHealthCheck>(
    "mainSlice/getHealthCheck",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.healthCheck();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }

    }
)

const getBaseStatus = createAsyncThunk<IBaseStatus>(
    "mainSlice/getBaseStatus",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.baseStatus();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }

    }
)

const getAll = createAsyncThunk<IUserResp[]>(
    'mainSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


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
        reset: (state) => {
            state.count = 0
        },
        change_string: (state, actions: PayloadAction<string>) => {
            state.test_string = actions.payload
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getHealthCheck.fulfilled, (state, action) => {
                const {result, detail, status_code} = action.payload;
                state.result = result
                state.detail = detail
                state.status_code = status_code
            })
            .addCase(getAll.fulfilled, (state, action) => {
                const data = action.payload
                const www = Object.values(data)[0]
                // @ts-ignore
                state.users = www
            })
            .addCase(getBaseStatus.fulfilled, (state, actions) => {
                const {postgres_status, redis_status: {status}} = actions.payload;
                state.postgres_status = postgres_status;
                state.redis_status = status
            })
            .addMatcher(isRejectedWithValue(), (state: IState, action) => {
                const errorPayload = action.payload as IError;
                state.errors = errorPayload
            })
})

const {reducer: mainReducer, actions} = mainSlice;

const mainAction = {
    ...actions,
    getHealthCheck,
    getBaseStatus,
    getAll
};
export {mainReducer, mainAction}