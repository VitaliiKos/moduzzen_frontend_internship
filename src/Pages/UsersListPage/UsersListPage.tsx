import {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {PaginationItem, SkipItem, User} from '../../Components';
import css from './userListPage.module.css';


const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {users, total_page, total_item, limit, skip} = useAppSelector((state) => state.mainReducer);

    const [query, setQuery] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;

    useEffect(() => {
        dispatch(mainAction.getAll({query: {limit, skip}}));
    }, [dispatch, query, limit, skip]);


    return (
        <div className={css.userListWrapper}>
            <div className={css.userListTitle}>
            </div>
            <h4>Total items {total_item}</h4>
            <div className={css.paginationSelectedButton}>
                <div>
                    <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}/>
                </div>
                <div>
                    <SkipItem/>
                </div>
            </div>
            <div className={css.userList}>
                {
                    users.map(user => <User key={user.id} user={user}/>)
                }
            </div>
        </div>
    );
};

export {UsersListPage};