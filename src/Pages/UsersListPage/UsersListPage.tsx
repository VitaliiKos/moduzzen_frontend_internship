import {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {PaginationItem, User} from '../../Components';
import css from './userListPage.module.css';


const UsersListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {users, total_page, total_item, skip} = useAppSelector((state) => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;

    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }


    useEffect(() => {
        dispatch(mainAction.getAll({query: {skip}}));
    }, [dispatch, query, skip]);


    return (
        <div className={css.userListWrapper}>

            <h4>Total items {total_item}</h4>
            <div className={css.paginationSelectedButton}>
                <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                                selectedPage={selectedPage}
                />
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