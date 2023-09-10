import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams, useSearchParams} from 'react-router-dom';
import {notyficationsActions} from '../../Store/slice';
import { NotificationsList } from '..';

const UserNotificatuions: FC = () => {
    const dispatch = useAppDispatch();
    const {notyfications, total_page, total_item} = useAppSelector(state => state.notyficationsReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(notyficationsActions.getMyNotifications({query: {skip}}));
    }, [dispatch, query, skip, id]);
    return (
        <div>
            <NotificationsList notyfications={notyfications} total_page={total_page} total_item={total_item}/>
        </div>
    );
};

export {UserNotificatuions};