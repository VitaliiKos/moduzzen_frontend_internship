import {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {useNavigate} from 'react-router-dom';

import {authValidator} from '../../validators';
import {ILoginUser} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authActions} from '../../Store/slice';
import {RouterEndpoints} from '../../routes';
import { FormInput } from '../../Components';
import css from './registerPage.module.css';


const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const {error} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<ILoginUser>(
        {
            mode: 'all',
            resolver: joiResolver(authValidator)
        }
    );

    const registerUser: SubmitHandler<ILoginUser> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.registerUser(user));
        if (requestStatus === 'fulfilled') {
            navigate(`/${RouterEndpoints.login}`)
        }
        reset()
    };


    return (
        <>
            <h2>Sign-up</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                <div className={css.blockInput}>

                    <div>
                        <FormInput name={'email'} register={register}/>
                        <FormInput name={'password'} register={register}/>
                    </div>

                    <div>
                        <button disabled={!isValid}>Register</button>
                    </div>
                    {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                    {error && <div>{error.detail}</div>}
                </div>
            </form>
        </>
    );
};
export {RegisterPage};