import {FC, ReactElement} from 'react';
import {useAppSelector} from '../hooks';
import { Navigate } from 'react-router-dom';
import { RouterEndpoints } from '../routes';
import { authService } from '../services';

interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {
    const {me} = useAppSelector(state => state.authReducer);
    if (!me && !authService.getAccessToken()) {
        return <Navigate to={`/${RouterEndpoints.authorization}`}/>
    }


    return children
};

export {RequiredAuth};