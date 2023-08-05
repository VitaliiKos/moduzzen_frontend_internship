import {apiService} from '.';
import {mainUrls} from '../config';
import {IBaseStatus, IHealthCheck, IUser, IUserResp} from '../interfaces';
import {IRes} from '../types';


class UserService {
    getAll(): IRes<IUserResp[]> {
        return apiService.get(mainUrls.users.users)
    }

    create(user: IUser): IRes<IUser> {
        return apiService.post(mainUrls.users.users, user)
    }

    updateById(id: number, car: IUser): IRes<IUser> {
        return apiService.put(mainUrls.users.byId(id), car)
    }

    deleteById(id: number): IRes<void> {
        return apiService.delete(mainUrls.users.byId(id))
    }



    healthCheck(): IRes<IHealthCheck> {
        return apiService.get(mainUrls.healthCheck.healthCheck)
    }
    baseStatus(): IRes<IBaseStatus> {
        return apiService.get(mainUrls.baseStatus.baseStatus)
    }
}

export const userService = new UserService()