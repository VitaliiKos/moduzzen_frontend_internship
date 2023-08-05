import {REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT} from '../env';


const baseURL = `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`

const healthCheck = '/';
const users = '/users';

const mainUrls = {
    auth: {
        sign_up: '/sign-up',
        login: '/sign-in',
        me: `/me`
    },
    users: {
        users,
        byId: (id: number): string => `${users}/${id}`,
    },
    healthCheck: {
        healthCheck
    },
    baseStatus: {
        baseStatus: '/base_status'
    },

}

export {
    baseURL,
    mainUrls
}