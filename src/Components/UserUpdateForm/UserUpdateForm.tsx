import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {IUser} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authActions, mainAction} from '../../Store/slice';
import {FormInput} from '../FormInput/FormInput';
import css from './userUpdateForm.module.css';
import {ButtonNavigate} from '../ButtonNavigate/ButtonNavigate';
import {joiResolver} from '@hookform/resolvers/joi';
import {profileValidator} from '../../validators';


const UserUpdateForm: FC = () => {

    const {reset, handleSubmit, register, setValue, formState: {errors, isValid}} = useForm<IUser>(
        {
            mode: 'all',
            resolver: joiResolver(profileValidator)
        }
    );
    const dispatch = useAppDispatch();
    const {userForUpdate, error} = useAppSelector(state => state.mainReducer);

    useEffect(() => {
        if (userForUpdate) {
            setValue('username', userForUpdate.username)
            setValue('email', userForUpdate.email)
            setValue('age', userForUpdate.age)
            setValue('city', userForUpdate.city)
            setValue('phone_number', userForUpdate.phone_number)
        }
    }, [userForUpdate, setValue])

    const update: SubmitHandler<IUser> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(mainAction.update({id: Number(userForUpdate!.id), user}))

        if (requestStatus === 'fulfilled') {
            dispatch(authActions.me());
        }
        reset()
    };

    return (
        <>
            <div onClick={() => dispatch(mainAction.setUserForUpdate(null))}>
                <ButtonNavigate navigate_params={'/profile'} button_title={'X'}/>
            </div>
            <form onSubmit={handleSubmit(update)}>
                <div className={css.inputWrapper}>
                    <FormInput name={'username'} register={register}/>
                    <FormInput name={'email'} register={register}/>
                    <FormInput name={'age'} register={register}/>
                    <FormInput name={'city'} register={register}/>
                    <FormInput name={'phone_number'} register={register}/>
                </div>

                <div>
                    <button className={css.buttonUpdate} disabled={!isValid}>Update</button>
                </div>
                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                {error && <div>{error.detail}</div>}
            </form>

        </>
    );
};

export {UserUpdateForm};