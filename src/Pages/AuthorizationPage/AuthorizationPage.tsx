import {FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {FormInput} from '../../Components';
import { RouterEndpoints } from '../../routes';

const AuthorizationPage: FC = () => {

    const initialValue = {
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const [user, setUser] = useState(initialValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUser(initialValue)
        navigate(`/${RouterEndpoints.users}`)
    };

    return (
        <div>
            <h3>AuthorizationPage</h3>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={user.email} onChange={handleInputChange}/>
                <FormInput name="password" value={user.password} onChange={handleInputChange} type="password"/>
                <button type="submit">Login</button>
            </form>

        </div>
    );
};

export {AuthorizationPage};