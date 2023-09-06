import {apiService} from '.';
import {IRequest} from '../interfaces/request.interface';

import {mainUrls} from '../config';
import {IPagination} from '../interfaces';
import {IRes} from '../types';
import {IQuizAnswerForUpdate, IQuizCreateRequest, IQuizForUpdate, IQuizFullResponse,
    IQuizQuestionForUpdate, IQuizResponse, IVoteDataRequest, IVoteResultResponse} from '../interfaces/quiz.interface';


class QuizService {
    getCompanyQuizzes(company_id: number, {skip = 0}: IRequest): IRes<IPagination<IQuizResponse[]>> {
        return apiService.get(mainUrls.quizzes.quizes_by_company(company_id), {params: {skip}})
    }

    getQuizById(quiz_id: number): IRes<IQuizFullResponse> {
        return apiService.get(mainUrls.quizzes.byId(quiz_id))
    }

    sendVote(quiz_id: number, company_id: number, vote_data: IVoteDataRequest): IRes<IVoteResultResponse> {
        return apiService.post(mainUrls.quizzes.send_vote(quiz_id, company_id), vote_data)
    }
    createQuiz(quiz_data:IQuizCreateRequest): IRes<IQuizResponse> {
        return apiService.post(mainUrls.quizzes.createQuiz(), quiz_data)
    }
    deleteQuiz(quiz_id:number): IRes<void> {
        return apiService.delete(mainUrls.quizzes.deleteQuiz(quiz_id))
    }
    updateQuizById(id: number, quiz_data: IQuizForUpdate ): IRes<void > {
        return apiService.put(mainUrls.quizzes.updateQuiz(id), quiz_data)
    }
    updateQuestionById(question_id: number, question_data: IQuizQuestionForUpdate ): IRes<void > {
        return apiService.put(mainUrls.quizzes.updateQuestion(question_id), question_data)
    }
    updateAnswerById(answer_id: number, question_id:number, answer_data: IQuizAnswerForUpdate ): IRes<void > {
        return apiService.put(mainUrls.quizzes.updateAnswer(answer_id, question_id), answer_data)
    }
    deleteAnswerById(answer_id: number, quiz_id:number): IRes<void > {
        return apiService.delete(mainUrls.quizzes.deleteAnswer(answer_id, quiz_id))
    }
    deleteQuestionById(question_id: number, quiz_id:number): IRes<void > {
        return apiService.delete(mainUrls.quizzes.deleteQuestion(question_id, quiz_id))
    }
}

export const quizService = new QuizService()