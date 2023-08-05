import {FC, ReactElement} from 'react';
import {useAppSelector} from '../hooks';
import { Navigate } from 'react-router-dom';
import { RouterEndpoints } from '../routes';

interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {
    const {me} = useAppSelector(state => state.authReducer);
    if (!me) {
        return <Navigate to={`/${RouterEndpoints.authorization}`}/>
    }


    return children
};

export {RequiredAuth};