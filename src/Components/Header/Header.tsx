import {FC} from 'react';
import { NavLink } from 'react-router-dom';
import {RouterEndpoints} from "../../routes";

const Header:FC = () => {
    return (
        <>
            <NavLink to={''}>Home</NavLink>
            <NavLink to={`/${RouterEndpoints.about}`}>About</NavLink>

        </>
    );
};

export {Header};