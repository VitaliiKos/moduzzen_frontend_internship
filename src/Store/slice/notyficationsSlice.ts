import {createSlice, createAsyncThunk, isRejectedWithValue, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {IError, IPagination, IRequest} from "../../interfaces";
import {AxiosError} from "axios";
import {INotificationResponse} from "../../interfaces/notifications.interface";
import {notyficationsService} from "../../services/notyficationsService";

interface IState {
    error: IError | null,
    notyfications: INotificationResponse[],
    total_item: number,
    total_page: number,
    new_msg: number
}

const initialState: IState = {
    error: null,
    notyfications: [],
    total_item: 0,
    total_page: 1,
    new_msg: 0
}


const getMyNotifications = createAsyncThunk<IPagination<INotificationResponse[]>, { query: IRequest }>(
    'notyficationsSlice/getMyNotifications',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await notyficationsService.getUserNotyfications(query)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const readNotifications = createAsyncThunk<void, { notif_id: number }>(
    'notyficationsSlice/readNotifications',
    async ({notif_id}, {rejectWithValue}) => {
        try {
            await notyficationsService.readNotifications(notif_id)

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)


const notyficationsSlice = createSlice({
    name: 'notyficationsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMyNotifications.fulfilled, (state, action: PayloadAction<IPagination<INotificationResponse[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.new_msg = (data.filter(item => !item.is_read)).length
                state.notyfications = data;
                state.total_item = total_item;
                state.total_page = total_page;
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IError;
            })

    }
});
const {actions, reducer: notyficationsReducer} = notyficationsSlice;
const notyficationsActions = {
    ...actions,
    getMyNotifications,
    readNotifications,
};

export {notyficationsReducer, notyficationsActions}