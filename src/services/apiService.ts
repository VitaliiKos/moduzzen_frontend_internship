import axios from "axios";

import {baseURL} from '../config';
import {authService} from './auth.service';


const apiService = axios.create({baseURL});


apiService.interceptors.request.use(config => {
    const access = authService.getAccessToken();
    config.headers!.Authorization = `Bearer ${access}`;

    if (access) {
        config.headers!.Authorization = `Bearer ${access}`;
    }

    return config
})


export {
    apiService,
}