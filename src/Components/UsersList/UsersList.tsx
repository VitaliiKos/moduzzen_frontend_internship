import {Dispatch, FC, SetStateAction} from 'react';
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
    setUser_id?: Dispatch<SetStateAction<number| null>>,
    children?: React.ReactNode,
}

const UsersList: FC<IProps> = ({users, total_page, total_item, children, setUser_id}) => {
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
                {
                    users.map(user => <User key={user.id} user={user} children={children} setUser_id={setUser_id}/>)
                }
            </div>
        </div>
    );
};

export {UsersList};

