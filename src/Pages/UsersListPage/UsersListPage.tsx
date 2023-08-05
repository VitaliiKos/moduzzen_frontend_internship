import {FC, useEffect} from 'react';
import {Outlet} from 'react-router-dom';

import css from './userListPage.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';
import { User } from '../../Components';


const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {users} = useAppSelector((state) => state.mainReducer);

    useEffect(() => {
        dispatch(mainAction.getAll())

    }, [dispatch]);
    return (
        <div className={css.userListWrapper}>
            <div className={css.userListTitle}>
                <h3>UsersListPage</h3>
            </div>
            <div className={css.userList}>

                {users &&
                    users.map(user =>
                        user.id && <User key={user.id} user={user}/>
                    )
                }
            </div>

            <div className={css.currentUserWrapper}>
                <Outlet/>
            </div>

        </div>
    );
};

export {UsersListPage};