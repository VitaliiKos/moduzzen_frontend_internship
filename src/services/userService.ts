import {apiService} from '.';

import {mainUrls} from '../config';
import {IBaseStatus, IHealthCheck, IPagination, IUser} from '../interfaces';
import {IRequest} from '../interfaces/request.interface';
import {IRes} from '../types';


class UserService {
    getAll({skip = 0}: IRequest): IRes<IPagination<IUser[]>> {
        return apiService.get(mainUrls.users.users, {params: {skip}})
    }

    getById(id: number): IRes<IUser> {
        return apiService.get(mainUrls.users.byId(id))
    }

    create(user: IUser): IRes<IUser> {
        return apiService.post(mainUrls.users.users, user)
    }

    updateById(id: number, user: IUser): IRes<IUser> {
        return apiService.patch(mainUrls.users.byId(id), user)
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