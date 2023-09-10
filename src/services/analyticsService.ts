import {apiService} from '.';
import {mainUrls} from '../config';
import {IUserSystemRating} from '../interfaces';
import {IRes} from '../types';

class AnalyticsService {
    getUserSystemRating(user_id: number): IRes<IUserSystemRating> {
        return apiService.get(mainUrls.analytics.getUserSystemRating(user_id))
    }
}

export const analyticsService = new AnalyticsService()