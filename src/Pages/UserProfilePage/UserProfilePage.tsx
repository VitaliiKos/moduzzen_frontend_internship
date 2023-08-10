import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';

import css from './userProfilePage.module.css'
import {mainAction} from '../../Store/slice';
import {UserUpdateForm} from '../../Components';
import { useNavigate } from 'react-router';
import { RouterEndpoints } from '../../routes';

const UserProfilePage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.authReducer);
    const {userForUpdate} = useAppSelector(state => state.mainReducer);

    useEffect(() => {

    }, [me, dispatch]);
    return (
        <div>
            <div className={css.profileWrapper}>
                {me &&
                    <div className={css.profileDescription}>
                        <h3>Id.{me.id}</h3>
                        <h3>Username: {me.username ? me.username : 'null'}</h3>
                        <h3>Email: {me.email}</h3>
                        <h3>Phone: {me.phone_number ? me.phone_number : 'null'}</h3>
                        <h3>City: {me.city ? me.city : 'null'}</h3>
                        <h3>Age: {me.age ? me.age : 'null'}</h3>
                        <h3>Created at: {me.created_at}</h3>
                        <h3>Updated at: {me.updated_at}</h3>
                        <div className={css.formButtonWrapper}>
                            <button onClick={() => dispatch(mainAction.setUserForUpdate(me))}>update</button>
                            <button onClick={() => {
                                dispatch(mainAction.deleteUser({'id': Number(me.id)}))
                                navigate(`/${RouterEndpoints.authorization}`)
                            }}>delete
                            </button>
                        </div>
                    </div>

                }
                <div className={css.profileAvatar}>
                    <img src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" alt="avatar"/>
                </div>
                <div>
                    {userForUpdate &&
                        <div className={css.profileFormUpdate}>
                            <UserUpdateForm/>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export {UserProfilePage};