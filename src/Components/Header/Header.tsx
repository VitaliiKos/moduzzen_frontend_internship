import {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {RouterEndpoints} from "../../routes";

const Header: FC = () => {
    return (
        <>
            <NavLink to={''}>Home</NavLink>
            <NavLink to={`/${RouterEndpoints.about}`}>About</NavLink>
            <NavLink to={`/${RouterEndpoints.users}`}>Users</NavLink>
            <NavLink to={`/${RouterEndpoints.company}`}>Companies</NavLink>
            <NavLink to={`/${RouterEndpoints.authorization}`}>Login</NavLink>
            <NavLink to={`/${RouterEndpoints.registration}`}>Register</NavLink>

        </>
    );
};

export {Header};