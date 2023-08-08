import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useAuth0} from '@auth0/auth0-react';

import {authActions, mainAction} from '../../Store/slice';
import {REACT_APP_AUTH0_AUDIENCE} from '../../env';
import {AxiosError} from 'axios';


const HomePage: FC = () => {

    const dispatch = useAppDispatch();
    const {result, detail, status_code, redis_status, postgres_status} = useAppSelector(state => state.mainReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getUserMetadata = async () => {

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: REACT_APP_AUTH0_AUDIENCE,
                        scope: "read:current_user",
                    },
                });
                localStorage.setItem('access', accessToken)
                dispatch(authActions.me())

            } catch (e) {
                const err = e as AxiosError
                return err.response?.data
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, me, dispatch]);

    useEffect(() => {
        dispatch(mainAction.getHealthCheck())
        dispatch(mainAction.getBaseStatus())
    }, [dispatch])

    return (
        <div>
            <h3>Home Page</h3>

            <div>
                <h3>Health Check endpoint</h3>
                <h4>Result: {result}</h4>
                <h4>Detail: {detail}</h4>
                <h4>Status_code: {status_code}</h4>
            </div>
            <div>
                <h3>Check base status</h3>
                <h4>Postgres status: {postgres_status}</h4>
                <h4>Redis status: {redis_status}</h4>
            </div>
        </div>
    );
};

export {HomePage};