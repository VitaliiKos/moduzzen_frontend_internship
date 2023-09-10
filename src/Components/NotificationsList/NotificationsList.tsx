import {FC} from 'react';
import {INotificationResponse} from '../../interfaces/notifications.interface';
import {useAppDispatch} from '../../hooks';
import {useSearchParams} from 'react-router-dom';
import {mainAction} from '../../Store/slice';
import {PaginationItem} from '..';
import {NotificationMsg} from '../NotificationMsg/NotificationMsg';
import css from './notificationsList.module.css';

interface IProps {
    notyfications: INotificationResponse[],
    total_item: number,
    total_page: number,
}

const NotificationsList: FC<IProps> = ({notyfications, total_page, total_item}) => {

    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;
    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }

    return (
        <div>
            <h3>Total items {total_item}</h3>
            <div>
                <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                                selectedPage={selectedPage}
                />
            </div>
            <div className={css.notificationList}>
                {
                    notyfications.map(notyfication => <NotificationMsg key={notyfication.id}
                                                                       notyfication={notyfication}/>)
                }
            </div>

        </div>
    );
};

export {NotificationsList};