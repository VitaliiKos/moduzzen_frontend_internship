import {FC, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {FormInput} from '../../Components';
import {ILoginUser} from '../../interfaces';
import {RouterEndpoints} from '../../routes';
import { handleChange } from '../../utils';

const AuthorizationPage: FC = () => {

    const initialValue: ILoginUser = {
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const [data, setData] = useState(initialValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, setData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(initialValue)
        navigate(`/${RouterEndpoints.users}`)
    };

    return (
        <div>
            <h3>AuthorizationPage</h3>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={data.email} onChange={handleInputChange}/>
                <FormInput name="password" value={data.password} onChange={handleInputChange} type="password"/>
                <button type="submit">Login</button>
            </form>

        </div>
    );
};

export {AuthorizationPage};