import {AxiosResponse} from 'axios';

import {ILoginUser, IRegisterUser, ITokens, IUser} from '../interfaces';
import {IRes} from '../types';
import {apiService} from './apiService';
import {mainUrls} from '../config';

class AuthService {
    private readonly accessKey = 'access'

    registerUser(user: IRegisterUser): IRes<IRegisterUser> {
        return apiService.post(mainUrls.auth.sign_up, user)
    }

    async login(user: ILoginUser): Promise<IUser> {
        const {data}: AxiosResponse<ITokens> = await apiService.post(mainUrls.auth.login, user);
        this.setTokens(data)
        const {data: me}: AxiosResponse<IUser> = await this.me();
        return me
    }


    me(): IRes<IUser> {
        return apiService.get(mainUrls.auth.me)
    }

    setTokens({access_token}: ITokens): void {
        localStorage.setItem(this.accessKey, access_token)
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.accessKey)
    }


    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
    }
}

export const authService = new AuthService()