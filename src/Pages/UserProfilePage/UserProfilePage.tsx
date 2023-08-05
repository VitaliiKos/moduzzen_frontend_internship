import {FC} from 'react';
import {useAppSelector} from '../../hooks';

import css from './userProfilePage.module.css'

const UserProfilePage: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);

    return (
        <div>
            <h3>UserProfilePage</h3>
            <div className={css.profileWrapper}>
                {me &&
                    <div className={css.profileDescription}>
                        <h3>Id.{me.id}</h3>
                        <h3>Username: {me.username}</h3>
                        <h3>Email: {me.email}</h3>
                        <h3>Phone: {me.phone_number ? me.phone_number : 'null'}</h3>
                        <h3>City: {me.city ? me.city : 'null'}</h3>
                        <h3>Age: {me.age ? me.age : 'null'}</h3>
                    </div>

                }
                <div className={css.profileAvatar}>
                    <img src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" alt="avatar"/>
                </div>
            </div>
        </div>
    );
};

export {UserProfilePage};