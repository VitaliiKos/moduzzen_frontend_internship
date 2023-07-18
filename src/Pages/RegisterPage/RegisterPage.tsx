import {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {handleChange} from '../../utils';
import {FormInput} from '../../Components';
import {IUser} from '../../interfaces/user.inteface';
import {RouterEndpoints} from '../../routes';

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
    const [data, setData] = useState<IUser>(defaultUser);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange<IUser>(event, setData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(defaultUser)
        navigate(`/${RouterEndpoints.authorization}`)
    };

    return (
        <div>
            <h3>RegisterPage</h3>
            <form onSubmit={handleSubmit}>
                <FormInput name="username" value={data.username} onChange={handleInputChange}/>
                <FormInput name="email" value={data.email} onChange={handleInputChange}/>
                <FormInput name="password" value={data.password} onChange={handleInputChange} type="password"/>
                <FormInput name="city" value={data.city} onChange={handleInputChange}/>
                <FormInput name="street" value={data.street} onChange={handleInputChange}/>
                <FormInput name="phone" value={data.phone} onChange={handleInputChange}/>
                <button type="submit">Register</button>
            </form>

        </div>
    );
};

export {RegisterPage};