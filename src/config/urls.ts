import {REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT} from '../env';


const baseURL = `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`

const healthCheck = '/';
const users = '/users';
const company = '/companies/company';

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
    company: {
        company,
        my_companiees: '/companies/my_company',
        byId: (id: number): string  => `${company}/${id}`,
        ger_user_role: (id: number) => `${company}/${id}/user_role`
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