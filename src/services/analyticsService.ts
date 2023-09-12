import {apiService} from '.';
import {mainUrls} from '../config';
import {
    IMemeberLastAttemptResponse, IPagination, IRequest, IUserCompanyRatingResponse, IUserSystemRating,
    IValiableQuizzesResponse, IAverageAllMembersForCurrentQuizResponse, IlistOfAverageInAllQuizzesInAllCompanies
} from '../interfaces';
import {IRes} from '../types';

class AnalyticsService {
    getUserSystemRating(user_id: number): IRes<IUserSystemRating> {
        return apiService.get(mainUrls.analytics.getUserSystemRating(user_id))
    }

    getUserCompanyRating(user_id: number, company_id: number): IRes<IUserCompanyRatingResponse> {
        return apiService.get(mainUrls.analytics.getUserCompanyRating(user_id, company_id))
    }

    listOfAllAvailableQuizzes({skip = 0}: IRequest): IRes<IPagination<IValiableQuizzesResponse[]>> {
        return apiService.get(mainUrls.analytics.listOfAllAvailableQuizzes, {params: {skip}})
    }

    averageInAllQuizzesInAllCompanies(user_id: number): IRes<IlistOfAverageInAllQuizzesInAllCompanies[]> {
        return apiService.get(mainUrls.analytics.averageInAllQuizzesInAllCompanies(user_id))
    }

    membersLastAttempt(company_id: number, {skip = 0}: IRequest): IRes<IMemeberLastAttemptResponse[]> {
        return apiService.get(mainUrls.analytics.membersLastAttempt(company_id), {params: {skip}})
    }

    averageAllMembersForCurrentQuiz(company_id: number, quiz_id: number): IRes<IPagination<IAverageAllMembersForCurrentQuizResponse[]>> {
        return apiService.get(mainUrls.analytics.averageAllMembersForCurrentQuiz(company_id, quiz_id))
    }
}

export const analyticsService = new AnalyticsService()