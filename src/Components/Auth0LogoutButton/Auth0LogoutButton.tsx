import {FC} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {NavLink} from 'react-router-dom';

import {useAppSelector} from '../../hooks';
import {authService} from '../../services';

const Auth0LogoutButton: FC = () => {
    const {logout} = useAuth0();
    const {me} = useAppSelector(state => state.authReducer);

    const Submit = () => {
        logout({logoutParams: {returnTo: window.location.origin}})
        authService.deleteTokens()
    }
    return (
        <div>{
            me &&
            <NavLink onClick={() => Submit()} to={`/` }>Log Out</NavLink>
        }</div>
    )
}
export {Auth0LogoutButton};