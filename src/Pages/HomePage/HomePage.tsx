import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';

const HomePage: FC = () => {

    const dispatch = useAppDispatch();
    const {result, detail, status_code,redis_status, postgres_status, errors} = useAppSelector(state => state.mainReducer);

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