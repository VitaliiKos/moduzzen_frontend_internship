import {PayloadAction, createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";

import {IError, IPagination, IRequest} from "../../interfaces";
import {
    IQuizAnswerForUpdate,
    IQuizCreateRequest,
    IQuizForUpdate,
    IQuizFullResponse, IQuizQuestionAnswerCreateRequest,
    IQuizQuestionCreateRequest,
    IQuizQuestionForUpdate,
    IQuizResponse,
    IVoteDataRequest,
    IVoteResultResponse
} from "../../interfaces/quiz.interface";
import {AxiosError} from "axios";
import {quizService} from "../../services";

interface IState {
    error: IError | null,
    total_item: number,
    total_page: number,
    company_quizzes: IQuizResponse[],
    selected_quiz: IQuizFullResponse | null,
    user_current_quiz_vote: IVoteResultResponse | null,
    question_id_for_add_answer: number | null
}

const initialState: IState = {
    error: {},
    total_item: 0,
    total_page: 1,
    company_quizzes: [],
    selected_quiz: null,
    user_current_quiz_vote: null,
    question_id_for_add_answer: null
}

const getCompanyQuizzes = createAsyncThunk<IPagination<IQuizResponse[]>, { company_id: number, query: IRequest }>(
    'quizSlice/getCompanyQuizzes',
    async ({company_id, query}, {rejectWithValue}) => {
        try {
            const {data} = await quizService.getCompanyQuizzes(company_id, query)
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const getQuizById = createAsyncThunk<IQuizFullResponse, { quiz_id: number }>(
    'quizSlice/getQuizById',
    async ({quiz_id}, {rejectWithValue}) => {
        try {
            const {data} = await quizService.getQuizById(quiz_id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const sendQuizVote = createAsyncThunk<IVoteResultResponse, {
    quiz_id: number,
    company_id: number,
    vote_data: IVoteDataRequest
}>(
    'quizSlice/sendQuizVote',
    async ({quiz_id, company_id, vote_data}, {rejectWithValue}) => {
        try {
            const {data} = await quizService.sendVote(quiz_id, company_id, vote_data);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const createQuiz = createAsyncThunk<void, IQuizCreateRequest>(
    'quizSlice/createQuiz',
    async (quiz_data, {rejectWithValue}) => {
        try {
            await quizService.createQuiz(quiz_data);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)
const createQuizQuestion = createAsyncThunk<void, { question_data: IQuizQuestionCreateRequest, quiz_id:number }>(
    'quizSlice/createQuizQuestion',
    async ({question_data, quiz_id}, {rejectWithValue}) => {
        try {
            await quizService.createQuizQuestion(quiz_id, question_data);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const createAnswer = createAsyncThunk<void, { answer_data: IQuizQuestionAnswerCreateRequest, question_id:number }>(
    'quizSlice/createAnswer',
    async ({answer_data, question_id}, {rejectWithValue}) => {
        try {
            await quizService.createQuizAnswer(question_id, answer_data);
            actions.set_question_id(null)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)


const deleteQuiz = createAsyncThunk<void, number>(
    'quizSlice/deleteQuiz',
    async (id, {rejectWithValue}) => {
        try {
            await quizService.deleteQuiz(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
)

const updateQuiz = createAsyncThunk<void, { quiz_data:IQuizForUpdate, quiz_id:number }>(
    'quizSlice/updateQuiz',
    async ({quiz_data, quiz_id}, {rejectWithValue}) => {
        try {
            await quizService.updateQuizById(quiz_id, quiz_data)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const updateQuizQuestion = createAsyncThunk<void, { question_data:IQuizQuestionForUpdate, question_id:number }>(
    'quizSlice/updateQuizQuestion',
    async ({question_data, question_id}, {rejectWithValue}) => {
        try {
            await quizService.updateQuestionById(question_id, question_data)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const updateQuizAnswer = createAsyncThunk<void, { answer_data:IQuizAnswerForUpdate, answer_id:number , question_id:number}>(
    'quizSlice/updateQuizAnswer',
    async ({answer_data, answer_id, question_id}, {rejectWithValue}) => {
        try {
            await quizService.updateAnswerById(answer_id, question_id, answer_data)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const deleteQuizAnswer = createAsyncThunk<void, {  answer_id:number , quiz_id:number}>(
    'quizSlice/deleteuizAnswer',
    async ({answer_id, quiz_id}, {rejectWithValue}) => {
        try {
            await quizService.deleteAnswerById(answer_id, quiz_id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const deleteQuizQuestion = createAsyncThunk<void, {  question_id:number , quiz_id:number}>(
    'quizSlice/deleteQuizQuestion',
    async ({question_id, quiz_id}, {rejectWithValue}) => {
        try {
            await quizService.deleteQuestionById(question_id, quiz_id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        reset_current_vote: (state) => {
            state.user_current_quiz_vote = null;
        },
        set_question_id: (state, action) => {
            state.question_id_for_add_answer = action.payload;
        },

    },
    extraReducers: builder => {
        builder
            .addCase(getCompanyQuizzes.fulfilled, (state, action: PayloadAction<IPagination<IQuizResponse[]>>) => {
                const {data, total_item, total_page} = action.payload;
                state.company_quizzes = data;
                state.total_item = total_item;
                state.total_page = total_page;
                state.user_current_quiz_vote = null
            })
            .addCase(getQuizById.fulfilled, (state, action) => {
                state.selected_quiz = action.payload;
            })
            .addCase(sendQuizVote.fulfilled, (state, action) => {
                state.user_current_quiz_vote = action.payload;
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

const {actions, reducer: quizReducer} = quizSlice;
const quizActions = {
    ...actions,
    getCompanyQuizzes,
    getQuizById,
    sendQuizVote,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    updateQuizQuestion,
    updateQuizAnswer,
    deleteQuizAnswer,
    deleteQuizQuestion,
    createQuizQuestion,
    createAnswer
};

export {quizActions, quizReducer};