import {ICompanyMembers} from "./companyMembers.interface"
import {IQuizResponse} from "./quiz.interface"

export interface IUserSystemRating {
    user_id: number,
    average_score: number,
}

export interface IUserCompanyRatingResponse {
    company_id: number,
    user_id: number,
    average_score: number
}

export interface IScoreResponce {
    quiz_result_id: number,
    total_question: number,
    total_correct_answers: number,
    average_score: number,
    timestamp: string,
}

export interface IlistOfAverageInAllQuizzesInAllCompanies {
    quiz_id: number,
    score: IScoreResponce[]
}


export interface IValiableQuizzesResponse {
    quiz: IQuizResponse,
    date: string,
}

export interface IEmployeeDataResponse {
    id: number,
    member: ICompanyMembers,
    company_id: number,
    role: string

}

export interface IMemeberLastAttemptResponse {
    employee: IEmployeeDataResponse,
    last_completed_time: string,

}

export interface IUserAttemptForQuiz {
    quiz_result_id: number,
    total_question: number,
    total_correct_answers: number,
    average_score: number,
    timestamp: string,
}

export interface IAverageAllMembersForCurrentQuizResponse {
    user_id: number,
    member: ICompanyMembers,
    score:IUserAttemptForQuiz[],
}