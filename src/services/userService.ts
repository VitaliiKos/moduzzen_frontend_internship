import {apiService} from '.';
import {mainUrls} from '../config';
import {IBaseStatus, IHealthCheck} from '../interfaces';
import {IRes} from '../types';


class UserService {
    healthCheck(): IRes<IHealthCheck> {
        return apiService.get(mainUrls.healthCheck.healthCheck)
    }
    baseStatus(): IRes<IBaseStatus> {
        return apiService.get(mainUrls.baseStatus.baseStatus)
    }
}

export const userService = new UserService()