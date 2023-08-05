import {FC} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const Auth0LoginButton: FC = () => {
    const {loginWithRedirect, } = useAuth0();


    return (
        <div>
            <button onClick={() => loginWithRedirect()}>
                Log In with auth0
            </button>
        </div>
    )
}
export {Auth0LoginButton};