import {REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT} from '../env';


const baseURL = `${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`

const healthCheck = '/'
const users = '/users'
const mainUrls = {
    healthCheck:{
        healthCheck
    },
    baseStatus:{
        baseStatus:'/base_status'
    },
    users:{
        users,
    }
}

export {
    baseURL,
    mainUrls
}