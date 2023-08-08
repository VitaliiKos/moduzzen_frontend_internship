import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {joiResolver} from '@hookform/resolvers/joi';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {ILoginUser} from '../../interfaces';
import {RouterEndpoints} from '../../routes';
import {authActions} from '../../Store/slice';
import {Auth0LoginButton, FormInput} from '../../Components';
import { authValidator } from '../../validators';



const AuthorizationPage: FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error} = useAppSelector(state => state.authReducer);

    const {handleSubmit, formState: {errors, isValid},  register,reset} = useForm<ILoginUser>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });

    const login: SubmitHandler<ILoginUser> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login(user));

        if (requestStatus === 'fulfilled') {
            navigate(`/${RouterEndpoints.users}`);
        }
        reset()
    };

    return (
        <>
            <h2>Sign-in</h2>
            <form onSubmit={handleSubmit(login)}>
                <div>
                    <FormInput name={'email'} register={register}/>
                    <FormInput name={'password'} register={register} />
                </div>
                <button disabled={!isValid}>Login</button>
                <Auth0LoginButton/>

                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                {error && <div>{error.detail}</div>}

            </form>
        </>
    );
};

export {AuthorizationPage};