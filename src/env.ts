const REACT_APP_API_HOST: string | undefined = process.env.REACT_APP_API_HOST;
const REACT_APP_API_PORT: string | undefined = process.env.REACT_APP_API_PORT;
const REACT_APP_DOCKER_PORT: string | undefined = process.env.REACT_APP_DOCKER_PORT;
const REACT_APP_BACKEND_PORT: string | undefined = process.env.REACT_APP_BACKEND_PORT;
const REACT_APP_BACKEND_HOST: string | undefined = process.env.REACT_APP_BACKEND_HOST;
const REACT_APP_AUTH0_DOMAIN: string = process.env.REACT_APP_AUTH0_DOMAIN!;
const REACT_APP_AUTH0_CLIENT_ID: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const REACT_APP_AUTH0_AUDIENCE: string = process.env.REACT_APP_AUTH0_AUDIENCE!;

export {
    REACT_APP_API_HOST,
    REACT_APP_API_PORT,
    REACT_APP_DOCKER_PORT,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_HOST,
    REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID,
    REACT_APP_AUTH0_AUDIENCE
};