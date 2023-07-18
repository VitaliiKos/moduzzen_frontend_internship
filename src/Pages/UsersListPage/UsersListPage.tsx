import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {User} from '../../Components/User/User';
import {users} from '../../temporaryData';
import css from './userListPage.module.css';


const UsersListPage: FC = () => {
    return (
        <div className={css.userListWrapper}>
            <div className={css.userListTitle}>
                <h3>UsersListPage</h3>
            </div>
            <div className={css.userList}>
                {
                    users.map(user => <User key={user.id} user={user}/>)
                }
            </div>

            <div className={css.currentUserWrapper}>
                <Outlet/>
            </div>

        </div>
    );
};

export {UsersListPage};