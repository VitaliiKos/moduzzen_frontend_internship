import {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {UsersList} from '../../Components';
import css from './userListPage.module.css';


const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {users, total_page, total_item, skip} = useAppSelector((state) => state.mainReducer);

    const [query] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(mainAction.getAll({query: {skip}}));
    }, [dispatch, query, skip]);


    return (
        <div className={css.userListWrapper}>

            <div className={css.userList}>
                <UsersList users={users} total_page={total_page} total_item={total_item}/>
            </div>

        </div>
    );
};

export {UsersListPage};