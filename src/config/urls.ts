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
        byIdStatus: (company_id: number) => `${company}/${company_id}/status`,
        ger_user_role: (id: number) => `${company}/${id}/user_role`,
        find_companies: () => `${invitation}/company/find`,

    },
    invitation: {
        members: (company_id: number) => `${invitation}/company/${company_id}/members`,
        candidates: (company_id: number) => `${invitation}/company/${company_id}/candidates`,
        send_invite: (company_id: number, user_id: number) => `${invitation}/invitation_send_from_company/${company_id}/user/${user_id}`,
        send_request: (company_id: number) => `${invitation}/action/create_from_user/company/${company_id}/`,
        company_invite: (company_id: number) => `${invitation}/company/${company_id}/invitation_list`,
        company_requests: (company_id: number) => `${invitation}/company/${company_id}/requests_list`,
        my_invite: () => `${invitation}/user/invitation_list`,
        my_requests: () => `${invitation}/users/requests_list`,
        cancel_invite: (action_id: number) => `${invitation}/${action_id}/cancel_invitation`,
        cancel_requeest: (action_id: number) => `${invitation}/${action_id}/cancel_request`,
        reject_invite: (action_id: number) => `${invitation}/${action_id}/reject_invite`,
        reject_request: (action_id: number) => `${invitation}/${action_id}/reject_request`,
        accept_invite: (action_id: number) => `${invitation}/${action_id}/accept_invite`,
        accept_request: (action_id: number) => `${invitation}/${action_id}/accept_request`,
        userToAdmin: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/add_to_admin`,
        adminToUser: (company_id: number, user_id: number) => `${invitation}/company/${company_id}/${user_id}/remove_from_admin`,
        fired_from_the_company: (company_id: number, user_id: number) => `${invitation}/${company_id}/dismiss_employee/${user_id}`,
        leave_company: (company_id: number) => `${invitation}/${company_id}/leave_company`,
        admins: (company_id: number) => `${invitation}/action/${company_id}/get_list_of_admins`,

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