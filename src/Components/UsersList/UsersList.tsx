import {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

import {IUser} from '../../interfaces';
import {PaginationItem} from '../PaginationItem/PaginationItem';
import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {User} from '../User/User';
import css from './usersList.module.css'

interface IProps {
    users: IUser[],
    total_item: number,
    total_page: number,
}

const UsersList: FC<IProps> = ({users, total_page, total_item}) => {
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;


    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }

    return (
        <div>
            <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                            selectedPage={selectedPage}
            />
            <div className={css.userListWrapper}>
                {users &&
                    users.map(user => <User key={user.id} user={user} />)
                }
            </div>
        </div>
    );
};

export {UsersList};

