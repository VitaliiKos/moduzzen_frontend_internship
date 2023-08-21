import {PayloadAction, createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {IUser, IPagination, IRequest, IError} from "../../interfaces";
import {AxiosError} from "axios";
import {companyActivitiesService} from "../../services";
import {IInvites} from "../../interfaces/invites.interface";


interface IState {
    members: IUser[]
    candidates: IUser[],
    total_item: number,
    total_page: number,
    limit: number,
    skip: number,
    error: IError | null,
    invites: IInvites[],
    requests: IInvites[]


}

const initialState: IState = {
    members: [],
    candidates: [],
    total_item: 0,
    total_page: 1,
    limit: 5,
    skip: 0,
    error: null,
    invites: [],
    requests: []
}


const getMembers = createAsyncThunk<IPagination<IUser[]>, {
    company_id: number,
    query: IRequest
}>(
    'companyActivitiesSlice/getMembers',
    async ({company_id, query}, {rejectWithValue}) => {
        try {
            const {data} = await companyActivitiesService.getCompanyMembers(company_id, query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const getPotentialCandidates = createAsyncThunk<IPagination<IUser[]>, {
    company_id: number,
    query: IRequest
}>(
    'companyActivitiesSlice/getPotentialCandidates',
    async ({query, company_id}, {rejectWithValue}) => {
        try {
            const {data} = await companyActivitiesService.getCandidates(company_id, query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const sendInviteFromCompany = createAsyncThunk<void, {
    company_id: number,
    user_id: number
}>(
    'companyActivitiesSlice/sendInviteFromCompany',
    async ({user_id, company_id}, {rejectWithValue}) => {
        try {
            await companyActivitiesService.sendInvite(company_id, user_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const getCompanyInvites = createAsyncThunk<IPagination<IInvites[]>, {
    company_id: number,
    query: IRequest
}>(
    'companyActivitiesSlice/getCompanyInvites',
    async ({query, company_id}, {rejectWithValue}) => {
        try {
            const {data} = await companyActivitiesService.getCompanyInvites(company_id, query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getMyInvites = createAsyncThunk<IPagination<IInvites[]>, {
    query: IRequest
}>(
    'companyActivitiesSlice/getMyInvites',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await companyActivitiesService.getMyInvites(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getMyRequests = createAsyncThunk<IPagination<IInvites[]>, {
    query: IRequest
}>(
    'companyActivitiesSlice/getMyRequests',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await companyActivitiesService.getMyRequests(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const cancelCompanyInvite = createAsyncThunk<void, { employee_id: number }>(
    'companyActivitiesSlice/cancelCompanyInvite',
    async ({employee_id}, {rejectWithValue}) => {
        try {
            await companyActivitiesService.cancelInvite(employee_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const cancelUserRequest = createAsyncThunk<void, { employee_id: number }>(
    'companyActivitiesSlice/cancelUserRequest',
    async ({employee_id}, {rejectWithValue}) => {
        try {
            await companyActivitiesService.cancelRequest(employee_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const rejectInvite = createAsyncThunk<void, { employee_id: number }>(
    'companyActivitiesSlice/rejectInvite',
    async ({employee_id}, {rejectWithValue}) => {
        try {
            await companyActivitiesService.rejectInvite(employee_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const acceptInvite = createAsyncThunk<void, { employee_id: number }>(
    'companyActivitiesSlice/acceptInvite',
    async ({employee_id}, {rejectWithValue}) => {
        try {
            await companyActivitiesService.acceptInvite(employee_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const companyActivitiesSlice = createSlice({
    name: 'companyActivitiesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMembers.fulfilled, (state, action: PayloadAction<IPagination<IUser[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.candidates = [];
                state.members = data;

                state.total_item = total_item;
                state.total_page = total_page;
                state.error = null;

            })
            .addCase(getPotentialCandidates.fulfilled, (state, action: PayloadAction<IPagination<IUser[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.members = [];
                state.candidates = data;

                state.total_item = total_item
                state.total_page = total_page
                state.error = null;
            })
            .addCase(getCompanyInvites.fulfilled, (state, action: PayloadAction<IPagination<IInvites[]>>) => {
                const {data, total_item, total_page} = action.payload;

                state.invites = data;

                state.total_item = total_item
                state.total_page = total_page
                state.error = null;
            })
            .addCase(getMyInvites.fulfilled, (state, action: PayloadAction<IPagination<IInvites[]>>) => {
                const {data, total_item, total_page} = action.payload;

                state.invites = data;

                state.total_item = total_item
                state.total_page = total_page
                state.error = null;
            })
            .addCase(getMyRequests.fulfilled, (state, action: PayloadAction<IPagination<IInvites[]>>) => {
                const {data, total_item, total_page} = action.payload;

                state.requests = data;

                state.total_item = total_item
                state.total_page = total_page
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state: IState, action) => {
                const errorPayload = action.payload as IError;
                state.error = errorPayload;
            })

    }
})


const {actions, reducer: companyActivitiesReducer} = companyActivitiesSlice;
const companyActivitiesActions = {
    ...actions,
    getMembers,
    getPotentialCandidates,
    sendInviteFromCompany,
    getCompanyInvites,
    cancelCompanyInvite,
    getMyInvites,
    rejectInvite,
    acceptInvite,
    getMyRequests,
    cancelUserRequest
};

export {companyActivitiesReducer, companyActivitiesActions}