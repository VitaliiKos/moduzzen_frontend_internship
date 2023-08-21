import {REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT} from '../env';


const baseURL = `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`

const healthCheck = '/';
const users = '/users';
const company = '/companies/company';
const invitation = '/invitation';

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
        byId: (id: number): string => `${company}/${id}`,
        byIdInfo: (id: number): string => `${company}/${id}/info`,
        ger_user_role: (id: number) => `${company}/${id}/user_role`
    },
    invitation: {
        members: (company_id: number) => `${invitation}/company/${company_id}/members`,
        candidates: (company_id: number) => `${invitation}/company/${company_id}/candidates`,
        send_invite: (company_id: number, user_id: number) => `${invitation}/invitation_send_from_company/${company_id}/user/${user_id}`,
        company_invite: (company_id: number) => `${invitation}/company/${company_id}/invitation_list`,
        my_invite: () => `${invitation}/user/invitation_list`,
        my_requests: () => `${invitation}/users/requests_list`,
        cancel_invite: (action_id: number) => `${invitation}/${action_id}/cancel_invitation`,
        cancel_requeest: (action_id: number) => `${invitation}/${action_id}/cancel_request`,
        reject_invite: (action_id: number) => `${invitation}/${action_id}/reject_invite`,
        accept_invite: (action_id: number) => `${invitation}/${action_id}/accept_invite`,


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