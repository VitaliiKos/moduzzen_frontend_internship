import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';

import {ILoginUser, IRegisterUser, IUser} from '../../interfaces';
import {IErrorAuth} from '../../interfaces/error.interface';
import {authService} from '../../services';

interface IState {
    error: IErrorAuth | null,
    me: IUser | null
    token_status: boolean
}

const initialState: IState = {
    error: null,
    me: null,
    token_status: false
}

const registerUser = createAsyncThunk<void, IRegisterUser>(
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.registerUser(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const login = createAsyncThunk<IUser, ILoginUser>(
    'authSlice/login',
    async (data, {rejectWithValue}) => {
        try {
            return await authService.login(data);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data;

        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        set_token_status: (state) => {
            state.token_status = true;
        },
        delete_token: (state) => {
            localStorage.removeItem('access');
            state.token_status = false;
            state.me = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload;
                state.error = null;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload;
                state.error = null;

            })
            .addMatcher(isFulfilled(), state => {
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth;
            })
    }
});

const {actions, reducer: authReducer} = authSlice;
const authActions = {
    ...actions,
    registerUser,
    login,
    me,
};

export {authReducer, authActions}