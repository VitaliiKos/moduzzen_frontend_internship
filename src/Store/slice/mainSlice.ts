import {createSlice, PayloadAction, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBaseStatus, IHealthCheck, IPagination, IUser} from "../../interfaces";
import {authService, userService} from "../../services";
import {IError} from "../../interfaces/error.interface";
import {IRequest} from "../../interfaces/request.interface";

interface IState {
    count: number,
    test_string: string,
    error: IError | null,
    res: IHealthCheck | null
    result: string,
    detail: string,
    status_code: number | null,
    postgres_status: boolean,
    redis_status: string,
    users: IUser[],
    selected_user: IUser | null,
    userForUpdate: IUser | null,
    total_item: number,
    total_page: number,
    limit: number,
    skip: number,
}

const initialState: IState = {
    count: 0,
    test_string: '',
    res: null,
    error: {},
    result: '',
    detail: '',
    status_code: null,
    postgres_status: false,
    redis_status: '',
    users: [],
    selected_user: null,
    userForUpdate: null,
    total_item: 0,
    total_page: 1,
    limit: 5,
    skip: 0,
}


const getHealthCheck = createAsyncThunk<IHealthCheck>(
    "mainSlice/getHealthCheck",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.healthCheck();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }

    }
)

const getBaseStatus = createAsyncThunk<IBaseStatus>(
    "mainSlice/getBaseStatus",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.baseStatus();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }

    }
)


const getAll = createAsyncThunk<IPagination<IUser[]>, { query: IRequest }>(
    'mainSlice/getAll',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getById = createAsyncThunk<IUser, { id: number }>(
    'mainSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const update = createAsyncThunk<IUser, { user: IUser, id: number }>(
    'mainSlice/update',
    async ({id, user}, {rejectWithValue}) => {
        try {
            const {data} = await userService.updateById(id, user);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const deleteUser = createAsyncThunk<void, { id: number }>(
    'mainSlice/deleteUser',
    async ({id}, {rejectWithValue}) => {
        try {
            await userService.deleteById(id);
            authService.deleteTokens();
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setUserForUpdate: (state, action) => {
            state.userForUpdate = action.payload;
        },
        setSkip: (state, action) => {
            state.skip = state.limit * (action.payload - 1);
        },

        inc: (state) => {
            state.count += 1;
        },
        dec: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        change_string: (state, actions: PayloadAction<string>) => {
            state.test_string = actions.payload;
        },
        clearUserState: (state) => {
            state.users = [];
        },


    },
    extraReducers: builder =>
        builder
            .addCase(getHealthCheck.fulfilled, (state, action) => {
                const {result, detail, status_code} = action.payload;
                state.result = result;
                state.detail = detail;
                state.status_code = status_code;
            })
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IPagination<IUser[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.users = data;
                state.total_item = total_item;
                state.total_page = total_page;
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.selected_user = action.payload;
                state.error = null;
            })
            .addCase(update.fulfilled, state => {
                state.userForUpdate = null;
                state.error = null;
            })
            .addCase(getBaseStatus.fulfilled, (state, actions) => {
                const {postgres_status, redis_status: {status}} = actions.payload;
                state.postgres_status = postgres_status;
                state.redis_status = status;
            })
            .addMatcher(isRejectedWithValue(), (state: IState, action) => {
                const errorPayload = action.payload as IError;
                state.error = errorPayload;
            })
})

const {reducer: mainReducer, actions} = mainSlice;

const mainAction = {
    ...actions,
    getHealthCheck,
    getBaseStatus,
    getAll,
    getById,
    deleteUser,
    update,
};
export {mainReducer, mainAction}