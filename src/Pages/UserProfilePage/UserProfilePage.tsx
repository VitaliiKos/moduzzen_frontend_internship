import {FC, useEffect} from 'react';
import {useAppSelector} from '../../hooks';

import {UserProfile, UserUpdateForm} from '../../Components';
import css from './userProfilePage.module.css'

const UserProfilePage: FC = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const {userForUpdate,} = useAppSelector(state => state.mainReducer);
    useEffect(() => {

    }, [me]);
    return (
        <div className={css.profileWrapper}>
            {me &&
                <UserProfile me={me}/>
            }
            {
                userForUpdate &&
                <div className={css.profileFormUpdate}>
                    <UserUpdateForm/>
                </div>
            }

        </div>
    );
};

export {UserProfilePage};