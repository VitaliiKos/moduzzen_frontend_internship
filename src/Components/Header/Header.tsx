import {FC, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {RouterEndpoints} from "../../routes";
import {authActions, notyficationsActions} from '../../Store/slice';
import {Auth0LogoutButton, NotificationsBadge} from '../index'
import css from './header.module.css';


const Header: FC = () => {
    const {new_msg} = useAppSelector(state => state.notyficationsReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!me && localStorage.getItem('access')) {
            dispatch(authActions.me())


            
        }
    }, [me, dispatch])

    useEffect(() => {
        dispatch(notyficationsActions.getMyNotifications({query: {skip}}));

    }, [me, new_msg, skip, dispatch]);

    return (
        <>
            <NavLink to={''}>Home</NavLink>
            <NavLink to={`/${RouterEndpoints.about}`}>About</NavLink>

            <NavLink to={`/${RouterEndpoints.users}`}>Users</NavLink>
            <NavLink to={`/${RouterEndpoints.company}`}>Companies</NavLink>
            {me ?
                <div className={css.current_user_wrapper}>
                    <NotificationsBadge count_msg={new_msg}/>

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