import {FC, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {FormInput} from '../../Components';
import {IUser} from '../../interfaces/user.inteface';
import { RouterEndpoints } from '../../routes';

const RegisterPage: FC = () => {


    const defaultUser: IUser = {
        username: '',
        email: '',
        password: '',
        city: '',
        street: '',
        phone: ''
    }

    const navigate = useNavigate();
    const [user, setUser] = useState(defaultUser);

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
        setUser(defaultUser)
        navigate(`/${RouterEndpoints.authorization}`)
    };

    return (
        <div>
            <h3>RegisterPage</h3>
            <form onSubmit={handleSubmit}>
                <FormInput name="username" value={user.username} onChange={handleInputChange}/>
                <FormInput name="email" value={user.email} onChange={handleInputChange}/>
                <FormInput name="password" value={user.password} onChange={handleInputChange} type="password"/>
                <FormInput name="city" value={user.city} onChange={handleInputChange}/>
                <FormInput name="street" value={user.street} onChange={handleInputChange}/>
                <FormInput name="phone" value={user.phone} onChange={handleInputChange}/>
                <button type="submit">Register</button>
            </form>

        </div>
    );
};

export {RegisterPage};