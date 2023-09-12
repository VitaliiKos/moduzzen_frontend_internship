import {createSlice, createAsyncThunk, isRejectedWithValue, isFulfilled} from "@reduxjs/toolkit";
import {
    IError,
    IMemeberLastAttemptResponse,
    IPagination,
    IRequest,
    IUserCompanyRatingResponse,
    IUserSystemRating,
    IValiableQuizzesResponse,
    IAverageAllMembersForCurrentQuizResponse,
    IlistOfAverageInAllQuizzesInAllCompanies
} from "../../interfaces";
import {analyticsService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    error: IError | null,
    userSystemrating: number | null,
    userCompanyrating: IUserCompanyRatingResponse | null,
    userlistOfAverageInAllQuizzesInAllCompanies: IlistOfAverageInAllQuizzesInAllCompanies[],
    total_item: number,
    total_page: number,
    limit: number,
    skip: number,
    listOfAvaliableQuizzes: IValiableQuizzesResponse[],
    memberListWithLastAttempt: IMemeberLastAttemptResponse[],
    averageForCurrentQuiz: IAverageAllMembersForCurrentQuizResponse[]

}

const initialState: IState = {
    error: null,
    userSystemrating: null,
    userCompanyrating: null,
    userlistOfAverageInAllQuizzesInAllCompanies: [],
    total_item: 0,
    total_page: 1,
    limit: 5,
    skip: 0,
    listOfAvaliableQuizzes: [],
    memberListWithLastAttempt: [],
    averageForCurrentQuiz: []
}


const userRatingInSystem = createAsyncThunk<IUserSystemRating, { user_id: number }>(
    'analyticsSlice/userRatingInSyster',
    async ({user_id}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.getUserSystemRating(user_id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const userRatingInCompany = createAsyncThunk<IUserCompanyRatingResponse, { user_id: number, company_id: number }>(
    'analyticsSlice/userRatingInCompany',
    async ({user_id, company_id}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.getUserCompanyRating(user_id, company_id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const listOfAllAvailableQuizzes = createAsyncThunk<IPagination<IValiableQuizzesResponse[]>, {
    query: IRequest
}>(
    'analyticsSlice/listOfAllAvailableQuizzes',
    async ({query}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.listOfAllAvailableQuizzes(query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const listOfAverageInAllQuizzesInAllCompanies = createAsyncThunk<IlistOfAverageInAllQuizzesInAllCompanies[], {
    user_id: number
}>(
    'analyticsSlice/listOfAverageInAllQuizzesInAllCompanies',
    async ({user_id}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.averageInAllQuizzesInAllCompanies(user_id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const membersLastAttempt = createAsyncThunk<IMemeberLastAttemptResponse[], {
    company_id: number, query: IRequest
}>(
    'analyticsSlice/membersLastAttempt',
    async ({company_id, query}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.membersLastAttempt(company_id, query);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const averageAllMembersForCurrentQuiz = createAsyncThunk<IPagination<IAverageAllMembersForCurrentQuizResponse[]>, {
    company_id: number, quiz_id: number
}>(
    'analyticsSlice/averageAllMembersForCurrentQuiz',
    async ({company_id, quiz_id}, {rejectWithValue}) => {
        try {
            const {data} = await analyticsService.averageAllMembersForCurrentQuiz(company_id, quiz_id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(userRatingInSystem.fulfilled, (state, action) => {
                state.userSystemrating = action.payload.average_score;
                state.userCompanyrating = null;
            })
            .addCase(userRatingInCompany.fulfilled, (state, action) => {
                state.userCompanyrating = action.payload;
                state.userSystemrating = null;
            })
            .addCase(listOfAllAvailableQuizzes.fulfilled, (state, action) => {
                const {data, total_item, total_page} = action.payload
                state.listOfAvaliableQuizzes = data;
                state.total_item = total_item
                state.total_page = total_page
            })
            .addCase(membersLastAttempt.fulfilled, (state, action) => {
                state.memberListWithLastAttempt = action.payload;
            })
            .addCase(averageAllMembersForCurrentQuiz.fulfilled, (state, action) => {
                const {data, total_item, total_page} = action.payload
                state.averageForCurrentQuiz = data;
                state.total_item = total_item
                state.total_page = total_page
            })
            .addCase(listOfAverageInAllQuizzesInAllCompanies.fulfilled, (state, action) => {
                state.userlistOfAverageInAllQuizzesInAllCompanies = action.payload;
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
    userRatingInSystem,
    listOfAverageInAllQuizzesInAllCompanies,
    userRatingInCompany,
    listOfAllAvailableQuizzes,
    membersLastAttempt,
    averageAllMembersForCurrentQuiz
};

export {analyticsReducer, analyticsActions}