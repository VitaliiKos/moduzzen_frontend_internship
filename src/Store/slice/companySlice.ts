import {createSlice, PayloadAction, createAsyncThunk, isRejectedWithValue, isFulfilled} from "@reduxjs/toolkit";
import {IError} from "../../interfaces/error.interface";
import {ICompany, IPagination, IRequest} from '../../interfaces';
import {companyService} from '../../services';
import {AxiosError} from "axios";


interface IState {
    error: IError | null,
    companies: ICompany[],
    selected_company: ICompany | null,
    companyForUpdate: ICompany | null,
    total_item: number,
    total_page: number,
    limit: number,
    skip: number,
    company_role: string | null

}

const initialState: IState = {
    error: {},
    companies: [],
    selected_company: null,
    companyForUpdate: null,
    total_item: 0,
    total_page: 1,
    limit: 5,
    skip: 0,
    company_role: ''


}

const getAll = createAsyncThunk<IPagination<ICompany[]>, { query: IRequest }>(
    'companySlise/getAll',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getAll(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getById = createAsyncThunk<ICompany, { id: number }>(
    'companySlise/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const getMyCompanies = createAsyncThunk<IPagination<ICompany[]>, { query: IRequest }>(
    'companySlise/getMyCompanies',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getMyCompany(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
export interface ICompanyRole {
    role: string
}


const getUserRole = createAsyncThunk<ICompanyRole, { id: number }>(
    'companySlise/getUserRole',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getUserRole(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const deleteCompany = createAsyncThunk<void, { id: number }>(
    'mainSlice/deleteCompany',
    async ({id}, {rejectWithValue}) => {
        try {
            await companyService.deleteById(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const creteCompany = createAsyncThunk<void, ICompany>(
    'companySlise/creteCompany',
    async (company, {rejectWithValue}) => {
        try {
            await companyService.create(company);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const updateCompany = createAsyncThunk<void, { company: ICompany, id: number }>(
    'companySlise/updateCompany',
    async ({id, company}, {rejectWithValue}) => {
        try {
            await companyService.updateById(id, company)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const companySlise = createSlice({
    name: 'companySlise',
    initialState,
    reducers: {
        setCompanyForUpdate: (state, action) => {
            state.companyForUpdate = action.payload;
        },
        setSkip: (state, action) => {
            state.skip = state.limit * (action.payload - 1);
        },

    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action: PayloadAction<IPagination<ICompany[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.companies = data;
                state.total_item = total_item;
                state.total_page = total_page;
                state.companyForUpdate = null;


            })
            .addCase(getMyCompanies.fulfilled, (state, action: PayloadAction<IPagination<ICompany[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.companies = data;
                state.total_item = total_item;
                state.total_page = total_page;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.selected_company = action.payload;
            })
            .addCase(getUserRole.fulfilled, (state, action) => {
                const {role} = action.payload;
                state.company_role = role;
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isRejectedWithValue(), (state: IState, action) => {
                const errorPayload = action.payload as IError;
                state.error = errorPayload;
            })


    }
})

const {actions, reducer: companyReducer} = companySlise;
const companyActions = {
    ...actions,
    getAll,
    getById,
    getMyCompanies,
    creteCompany,
    getUserRole,
    deleteCompany,
    updateCompany
};

export {companyReducer, companyActions}