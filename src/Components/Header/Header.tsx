import {FC, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {RouterEndpoints} from "../../routes";
import {authActions} from '../../Store/slice';
import {Auth0LogoutButton} from '../index'
import css from './header.module.css';


const Header: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!me && localStorage.getItem('access')) {
            dispatch(authActions.me())
        }
    }, [me, dispatch])

    return (
        <>
            <NavLink to={''}>Home</NavLink>
            <NavLink to={`/${RouterEndpoints.about}`}>About</NavLink>

            <NavLink to={`/${RouterEndpoints.users}`}>Users</NavLink>
            <NavLink to={`/${RouterEndpoints.company}`}>Companies</NavLink>
            {me ?
                <div className={css.current_user_wrapper}>
                    <NavLink to={`${RouterEndpoints.profile}`}>{me.email}</NavLink>
                    <Auth0LogoutButton/>
                </div>
                :

                <>
                    <NavLink to={`/${RouterEndpoints.authorization}`}>Login</NavLink>
                    <NavLink to={`/${RouterEndpoints.registration}`}>Register</NavLink>
                </>
            }
        </>
    );
};

export {Header};