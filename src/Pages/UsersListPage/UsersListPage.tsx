import {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {PaginationItem, User} from '../../Components';
import css from './userListPage.module.css';


const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {users, total_page, total_item} = useAppSelector((state) => state.mainReducer);

    const [query] = useSearchParams({page: '0'});
    const skipQueryParam = query.get('skip');
    const skipValue = skipQueryParam !== null ? parseInt(skipQueryParam, 10) : 0;

    useEffect(() => {
        dispatch(mainAction.getAll({skip: {skip: skipValue}}));
    }, [dispatch, query, skipValue]);


    return (
        <div className={css.userListWrapper}>
            <div className={css.userListTitle}>
            </div>
            <h4>Total items {total_item}</h4>
            <PaginationItem total_page={total_page} total_item={total_item}/>
            <div className={css.userList}>
                {
                    users.map(user => <User key={user.id} user={user}/>)
                }
            </div>
        </div>
    );
};

export {UsersListPage};