export interface IQuizResponse {
    id: number
    company_id: number
    user_id: number
    title: string
    description: string
    frequency_in_days: number
}

export interface IQuizFullResponse {
    id: number
    company_id: number
    user_id: number
    title: string
    description: string
    frequency_in_days: number
    questions: IQuizQuestionFullResponse[]
}

export interface IQuizQuestionFullResponse {
    id: number
    quiz_id: number
    question_text: string
    answers: IQuizQuestionAnswerFullResponse[]
}

export interface IQuizQuestionAnswerFullResponse {
    id: number
    answer_text: string
    is_correct: boolean
    question_id: number
}

export interface IVoteDataRequest {
    "vote_data": {}
}

export interface IVoteResultResponse {
    id: number
    user_id: number
    quiz_id: number
    company_id: number
    score: number
    total_answers: number
    total_question: number
    timestamp: string

}

export interface IQuizQuestionAnswerCreateRequest {
    answer_text: string
    is_correct: boolean
}

export interface IQuizQuestionCreateRequest {
    question_text: string
    answers: IQuizQuestionAnswerCreateRequest[]
}

export interface IQuizCreateRequest {
    title: string
    description: string
    frequency_in_days: number
    company_id: number
    questions_data: IQuizQuestionCreateRequest[]
}

export interface IQuizForUpdate {
    // id?:number
    title?: string
    description?: string
    frequency_in_days?: number
}

export interface IQuizQuestionForUpdate {
    question_text?: string
}

export interface IQuizAnswerForUpdate {
    answer_text?: string
    is_correct?: boolean

}

export interface IQuizData {
    quiz: IQuizForUpdate
}

export interface IQquestionData {
    question_id: number
    question: IQuizQuestionForUpdate
}

export interface IAnswerData {
    question_id: number
    answer_id: number
    answer: IQuizAnswerForUpdate
}

